import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";
import dotenv from "dotenv";
dotenv.config();
const vendorMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Check if token exists in cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Find vendor (exclude password)
    const vendor = await Vendor.findById(decoded.id).select("-password");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    // 4️⃣ Attach vendor to request
    req.vendor = vendor;

    next();
  } catch (error) {
    console.error("Vendor Auth Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid token. Authentication failed.",
    });
  }
};

export default vendorMiddleware;