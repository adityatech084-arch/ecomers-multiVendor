import express from "express";
import {
  getProducts,
  getStarterProducts,
  getProductById,
  searchProducts,
} from "../controllers/productControler.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ Get all products
router.get("/all", getProducts);

// ✅ Get starter products
router.get("/starter", getStarterProducts);

// ✅ Get product by ID
// router.get("/filter", async (req, res) => {
//   try {
//     const { category, brand, price, limit } = req.query;

//     const filter = {};

//     const clean = (str) => str && str.trim() !== "" && str !== "undefined" ? str.trim() : null;

//     if (clean(category)) filter.category = { $regex: new RegExp(`^${clean(category)}$`, "i") };
//     if (clean(brand)) filter.brand = { $regex: new RegExp(`^${clean(brand)}$`, "i") };

//     if (clean(price) && price.includes("-")) {
//       const [min, max] = price.split("-").map(Number);
//       if (!isNaN(min) && !isNaN(max)) filter.salePrice = { $gte: min, $lte: max };
//     }

//     console.log(filter)
//     const products = await Product.find(filter)
//       .limit(Number(limit) || 20)
//       .lean();

//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

router.get("/filter", async (req, res) => {
  try {
    const { category, brand, price, limit } = req.query;

    const filter = {};

    const clean = (str) =>
      str && str.trim() !== "" && str !== "undefined" && str !== "null" ? str.trim() : null;

    const cat = clean(category);
    const br = clean(brand);
    const pr = clean(price);

    if (cat) filter.category = { $regex: cat, $options: "i" };
    if (br) filter.brand = { $regex: br, $options: "i" };

    if (pr) {
      if (pr.includes("-")) {
        const [min, max] = pr.split("-").map(Number);
        if (!isNaN(min) && !isNaN(max)) filter.salePrice = { $gte: min, $lte: max };
      } else if (pr.endsWith("up")) {
        const min = Number(pr.replace("up", ""));
        if (!isNaN(min)) filter.salePrice = { $gte: min };
      }
    }

    console.log("Filter applied:", filter);

    const products = await Product.find(filter)
      .limit(Number(limit) || 20)
      .lean();

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// GET /api/v1/product/vendor?vendorId=xxx&category=xxx&page=1&limit=10
router.get("/vendor", async (req, res) => {
  try {
    const { vendorId, category, page = 1, limit = 10 } = req.query;

    // vendorId is required
    if (!vendorId) {
      return res.status(400).json({ message: "vendorId is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid vendorId" });
    }

    // Base filter = vendor only
    const filter = { vendor: vendorId };

    // Optional category filter
    if (category && category.trim() !== "") {
      filter.$or = [
        { category: { $regex: category.trim(), $options: "i" } },
        { subCategory: { $regex: category.trim(), $options: "i" } },
      ];
    }

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const pages = Math.ceil(total / limitNum);

    res.json({ products, total, page: pageNum, pages });
  } catch (error) {
    console.error("Vendor products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




router.get('/search',searchProducts)
router.get("/:id", getProductById);



export default router;