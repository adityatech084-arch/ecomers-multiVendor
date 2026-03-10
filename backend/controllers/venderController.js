import Vendor from "../models/Vendor.js";
import { generateToken } from "../utils/jwt.js";
import sendOtpEmail from "../utils/sendOtpEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import Product from "../models/Product.js";
// import Busboy from "busboy";
import * as Busboy from "busboy";
import { uploadToCloudinary } from "../config/cloudinary.js";

const generateOtpToken = (userId) =>{

   return  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "10m" });
}

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
export const getVendor = async (req, res) => {             
    
     let v = req.vendor;
     let vendor = await Vendor.findById(v._id).select("-password");
     if(!vendor){
      return res.status(404).json({         
        sucess:false,
        message: "User not found"});
     }
     return res.status(200).json({        
       sucess:true,
     vendor,
     });
};


export const register = async (req, res) => {
  // console.log(req.body)
  try {
    const { name, email, password ,phone,storeName  } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor)
      return res.status(400).json({ success: false, message: "vender already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  

    const vendor = await Vendor.create({
        storeName,
      name,
      email,
      password: hashedPassword,
      phone,

      otp,
      otpExpires,
      isVerified: false
    });

    // TODO: Send OTP via email/SMS
    // console.log("OTP for verification:", otp);

    const otpToken = generateOtpToken(vendor._id);
return res.status(201).json({
      success: true,
      message: "vendor registered successfully. Please verify your account.",
      otpToken,
      otpExpires:otpExpires.getTime() 
    });
    // Redirect to OTP page with token
    // res.redirect(`/verify-otp?token=${otpToken}`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { token, otp } = req.body;

    // Check if token and OTP are provided
    if (!token || !otp) {
      return res.status(400).json({
        success: false,
        message: "Token or OTP missing",
      });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    // Check if already verified
    if (vendor.isVerifyOtp) {
      return res.status(400).json({ success: false, message: "Vendor already verified" });
    }

    // Check OTP validity
    if (vendor.otp !== otp || !vendor.otpExpires || vendor.otpExpires < new Date()) {
      return res.status(400).json({ success: false, message: "OTP invalid or expired" });
    }

    // Mark as verified
    vendor.isVerifyOtp = true;
    vendor.isVerified = true;
    vendor.otp = null;
    vendor.otpExpires = null;
    await vendor.save();

    // Generate JWT token
    generateToken(vendor._id, res);

    res.status(200).json({
      success: true,
      otpVerified: true,
      message: "OTP verified successfully",
      vendor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const vendor = await Vendor.findOne({ email });
//     if (!vendor) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     // If account not verified → Send OTP
//     if (!vendor.isVerifyOtp) {
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();

//       vendor.otp = otp;
//       vendor.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
//       await vendor.save();

//       await sendOtpEmail(vendor.email, otp);

//       const otpToken = generateOtpToken(vendor._id);

//       return res.status(200).json({
//         success: true,
//         requireOtp: true,
//         otpToken,
//       otpExpires:otpExpires.getTime() ,

//         message: "OTP sent to email",
//       });
//     }

//     // If verified → Normal login
//     generateToken(vendor._id, res);

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       vendor,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // If account not verified → Send OTP
    if (!vendor.isVerifyOtp) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      vendor.otp = otp;
      vendor.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
      await vendor.save();

      await sendOtpEmail(vendor.email, otp);

      const otpToken = generateOtpToken(vendor._id);

      return res.status(200).json({
        success: true,
        requireOtp: true,
        otpToken,
        otpExpires: vendor.otpExpires.getTime(), // ✅ fixed here
        message: "OTP sent to email",
      });
    }

    // If verified → Normal login
    generateToken(vendor._id, res);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      vendor,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const orders = async(req,res)=>{

}

export const productbyId = async(req,res)=>{

}



// Add Product Controller

// export const addProduct = async (req, res) => {
//   try {
//     // 1️⃣ Extract fields from body
//     const {
//       name,
//       description,
//       category,
//       brand,
//       sku,
//       basePrice,
//       salePrice,
//       stock,
//       weight,
//       dimensions,
//       features,
//       specs,
//       seoTitle,
//       seoKeywords,
//       isFeatured,
//       isHotDeal,
//       rating,
//     } = req.body;

//     if (!name || !category || !sku || !basePrice) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     // 2️⃣ Upload banner image (single file)
//     let bannerUrl = "";
//     if (req.files?.banner && req.files.banner[0]) {
//       bannerUrl = await uploadToCloudinary(req.files.banner[0].buffer, "products/banner");
//     }

//     // 3️⃣ Upload gallery images (multiple files)
//     let galleryUrls = [];
//     if (req.files?.gallery && req.files.gallery.length > 0) {
//       const uploadPromises = req.files.gallery.map(file =>
//         uploadToCloudinary(file.buffer, "products/gallery")
//       );
//       galleryUrls = await Promise.all(uploadPromises);
//     }

//     // 4️⃣ Create Product
//     const product = await Product.create({
//       name,
//       description,
//       category,
//       brand,
//       sku,
//       basePrice,
//       salePrice: salePrice || basePrice,
//       stock: stock || 0,
//       weight,
//       dimensions,
//       features,
//       specs,
//       seoTitle,
//       seoKeywords,
//       isFeatured: isFeatured || false,
//       isHotDeal: isHotDeal || false,
//       rating: rating || "0",
//       bannerImage: bannerUrl,
//       gallery: galleryUrls,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Add Product Error:", error.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




export const addProduct = async (req, res) => {
  try {
    // 1️⃣ Parse productData JSON from FormData
    let productData = {};
    if (req.body.productData) {
      try {
        // productData comes as a JSON string from frontend
        productData = JSON.parse(req.body.productData);
      } catch (err) {
        console.error("Invalid productData JSON:", err);
        return res
          .status(400)
          .json({ success: false, message: "Invalid productData JSON" });
      }
    }
// console.log(productData)
    // 2️⃣ Extract fields
    const {
      name,
      description,
      category,
      subCategory,
      brand,
      sku,
      basePrice,
      salePrice,
      stock,
      weight,
      dimensions,
      features,
      specs,
      seoTitle,
      seoKeywords,
      isFeatured,
      isHotDeal,
      rating,
    
    } = productData;
    // console.log(productData.name)

    // Validate required fields

    // 3️⃣ Parse arrays and booleans
    const featuresArray = Array.isArray(features) ? features : [];
   const specsArray = Array.isArray(specs)
  ? specs
  : [];

    const isFeaturedBool = isFeatured === true || isFeatured === "true";
    const isHotDealBool = isHotDeal === true || isHotDeal === "true";
    const stockNumber = parseInt(stock, 10) || 0;
    const ratingNumber = parseFloat(rating) || 0;

    // 4️⃣ Upload banner image
    let bannerUrl = "";
    if (req.files?.banner) {
      bannerUrl = await uploadToCloudinary(req.files.banner.data, "products/banner");
    }

    // 5️⃣ Upload gallery images
    let galleryUrls = [];
    if (req.files?.gallery) {
      const galleryFiles = Array.isArray(req.files.gallery)
        ? req.files.gallery
        : [req.files.gallery];

      galleryUrls = await Promise.all(
        galleryFiles.map((file) =>
          uploadToCloudinary(file.data, "products/gallery")
        )
      );
    }

    // 6️⃣ Create product
    const product = await Product.create({
      name,
      description,
      category,
      subCategory,
      brand,
      sku,
      basePrice,
      salePrice: salePrice || basePrice,
      stock: stockNumber,
      weight,
      dimensions,
      features: featuresArray,
      specs: specsArray,
      seoTitle,
      seoKeywords,
      isFeatured: isFeaturedBool,
      isHotDeal: isHotDealBool,
      rating: ratingNumber,
      bannerImage: bannerUrl,
      gallery: galleryUrls,
      vendor: req.vendor._id, // from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};