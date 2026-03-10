import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.js";
import Vendor from "../models/Vendor.js"
import sendOtpEmail from "../utils/sendOtpEmail.js";
import Category from "../models/Category.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "../config/cloudinary.js";
// import e from "express";
// ------------------ Helpers ------------------


const generateOtpToken = (userId) =>{

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
}

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// ------------------ Register ------------------
export const register = async (req, res) => {
  // console.log(req.body)
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerifyOtp: false
    });

    // TODO: Send OTP via email/SMS
    // console.log("OTP for verification:", otp);
      await sendOtpEmail(email, otp);
    const otpToken = generateOtpToken(user._id);

    // Redirect to OTP page with token
    // res.redirect(`http://localhost:5173/verify-otp?token=${otpToken}`);

return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your account.",
      otpToken,
      otpExpires:otpExpires.getTime() 
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ------------------ Verify OTP ------------------
export const verifyOtp = async (req, res) => {
  try {
    console.log("Received OTP verification request:", req.body);
    const { token, otp } = req.body;

    if (!token)
      return res.status(400).json({ success: false, message: "Token missing" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.isVerifyOtp)
      return res.status(400).json({ success: false, message: "User already verified" });

    if (user.otp !== otp || user.otpExpires < new Date())
      return res.status(400).json({ success: false, message: "OTP invalid or expired" });

    // OTP is valid
    user.isVerifyOtp = true;
    user.otp = "";
    user.otpExpires = null;

    await user.save();

    // Set JWT cookie and get token
    generateToken(user._id, res);

    return res.status(200).json({
      success: true,
      message: "Account verified successfully",
      user,
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------ Login ------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "No user Found / Invalid credentials",
      });

    // ✅ First check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    // 🔥 If OTP not verified
    if (!user.isVerifyOtp) {
      const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

      user.otp = otp;
      user.otpExpires = otpExpires; // 10 min
      await user.save();

      await sendOtpEmail(user.email, otp);

      const otpToken = generateOtpToken(user._id); // short expiry token

      return res.status(200).json({
        success: true,
        requireOtp: true,
        otpToken: otpToken,
        otpExpires:otpExpires.getTime(),
        message: "OTP sent to email",
      });
    }

    // ✅ If already verified → Normal Login Token
 generateToken(user._id, res); // normal 

   

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ------------------ Logout ------------------
export const logout = async (req, res) => {
  // In JWT auth, logout is client-side (delete token)
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ------------------ Change Password ------------------
export const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Forgot Password: Send OTP ------------------
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // TODO: Send OTP via email/SMS
    console.log("Reset OTP:", otp);

    const otpToken = generateOtpToken(user._id);

    res.redirect(`/reset-password?token=${otpToken}`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Reset Password ------------------
export const resetPassword = async (req, res) => {
  try {
    const { token, otp, newPassword } = req.body;
    if (!token) return res.status(400).json({ success: false, message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.otp !== otp || user.otpExpires < new Date())
      return res.status(400).json({ success: false, message: "OTP invalid or expired" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = "";
    user.otpExpires = null;
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------ Get User ------------------
export const getUser = async (req, res) => {             
    
     let u = req.user;
     let user = await User.findById(u._id).select("createdAt email name phone isVerifyOtp address ProfileImg");
     if(!user){
      return res.status(404).json({         
        sucess:false,
        message: "User not found"});
     }
     return res.status(200).json({        
       sucess:true,
     user,
     }); 
    // Get user logic here    

    // res.send("Get User endpoint");  
};


export const resendOtp = async (req, res) => {
  try {
    console.log("Received resend OTP request:", req.body);
    const { token } = req.body; // auth token from frontend

    if (!token) return res.status(400).json({ success: false, message: "Token missing" });

    const user = await User.findOne({ authToken: token });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    return res.json({
      success: true,
      message: "OTP resent successfully",
      expireAt: otpExpires.getTime(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getVendorDetails = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid vendor ID" });
    }

    // Fetch vendor and their categories
    const [vendor, categories] = await Promise.all([
      Vendor.findById(id).select("-password -otp -otpExpires"),
      Category.find({ isActive: true, vendor: id }).sort({ createdAt: -1 })
    ]);

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    res.status(200).json({
      success: true,
      vendor,
      categories
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    console.log("User ID:", req.user?._id);
    console.log("Request body:", req.body);
    console.log("Request files:", req.files); // <--- express-fileupload puts files here
    console.log("=== Update Profile Request ===");

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Handle text fields
    const allowedFields = ['name', 'email', 'phone', 'address', 'about', 'bio', 'gender'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== null && req.body[field] !== '') {
        user[field] = req.body[field];
      }
    });

    // Handle file upload via express-fileupload
    if (req.files && req.files.profilePic) {
      const file = req.files.profilePic;
      try {
        // file.data is a buffer
        const url = await uploadToCloudinary(file.data, "profile_pics");
        user.ProfileImg = url;
        console.log("Profile picture uploaded successfully:", url);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        // Don't fail the whole request
      }
    }

    await user.save();
    console.log("User updated successfully");

    const updatedUser = await User.findById(user._id).select('-password -resetPasswordToken -resetPasswordExpire');

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error("❌ updateProfile error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update profile"
    });
  }
};

