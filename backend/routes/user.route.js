import express from "express";
// import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getUser, getVendorDetails, login, logout, register, updateProfile, verifyOtp } from "../controllers/userControler.js";
import { getProductsByCategory } from "../controllers/categoryControler.js";
import Vendor from "../models/Vendor.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});


router.get("/me",authMiddleware,getUser);
router.post("/register",register);
router.post("/login",login);
router.post("/verify-otp",verifyOtp);

router.post("/logout",authMiddleware,logout);
router.get("/vendor/:id/details",authMiddleware,getVendorDetails)
// router.post("/change-password",authMiddleware,);
// router.post("/reset-password",authMiddleware,);



router.get("/products/category/:categoryName", getProductsByCategory);

router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Validate vendorId
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ success: false, message: "Invalid vendorId" });
    }

    const vendor = await Vendor.findById(vendorId).select("name _id"); // only name + id

    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor not found" });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.patch("/update-profile", authMiddleware,   upload.single("profilePic"), updateProfile);





// import { v2 as cloudinary } from "cloudinary";


export default router;