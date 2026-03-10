import Product from "../models/Product.js";

// 🔹 Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// 🔹 Get Starter Products
export const getStarterProducts = async (req, res) => {
  try {
    const products = await Product.find({ })
    res.status(200).json({
      success: true,
      message: "Starter products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch starter products",
      error: error.message,
    });
  }
};

// 🔹 Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("vendor","storeName");;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};



// controllers/productController.js


export const searchProducts = async (req, res) => {
  console.log(req.query)
  try {
    let { q, page = 1, limit = 5 } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (!q || q.trim() === "") {
      return res.json({
        success: true,
        products: [],
        total: 0,
        totalPages: 0,
        page: 1,
      });
    }

    const searchTerm = q.trim();

    // Escape regex special characters to avoid errors
    const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapeRegex(searchTerm), "i");

    const skip = (page - 1) * limit;

    // Fetch products and total count in parallel
    const [products, total] = await Promise.all([
      Product.find(
        { name: regex },
        { _id: 1, name: 1, description: 1, bannerImage: 1, basePrice: 1, salePrice: 1 ,basePrice:1}
      )
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments({ name: regex })
    ]);

    res.json({
      success: true,
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};