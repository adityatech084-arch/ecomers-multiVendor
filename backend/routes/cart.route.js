// routes/cart.js
import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔹 Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Find product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if product already in cart
    const index = cart.items.findIndex((item) => item.product.equals(product._id));
    if (index >= 0) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity, priceAtAdd: product.salePrice });
    }

    await cart.save();
    res.json({ success: true, cart:product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 🔹 Update quantity of a product in cart
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const index = cart.items.findIndex((item) => item.product.equals(productId));
    if (index < 0) return res.status(404).json({ message: "Product not in cart" });

    cart.items[index].quantity = Math.max(1, quantity); // Prevent negative or zero
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 🔹 Remove a product from cart
// DELETE a product from cart
router.delete("/remove/:productId", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name salePrice bannerImage category"
    );
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    // Remove item by product._id
    cart.items = cart.items.filter((item) => !item.product._id.equals(productId));
    await cart.save();

    // Format response: flat array of products with quantity
    const cartResponse = cart.items.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      bannerImage: item.product.bannerImage,
      category: item.product.category,
      salePrice: item.product.salePrice,
      quantity: item.quantity,
    }));

    res.json({ success: true, cart: cartResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
// 🔹 Clear entire cart
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    await cart.save();

    res.json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// 🔹 Get user cart
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product", "name salePrice bannerImage");
      const items = cart.items?.map(item => ({
      _id: item.product._id,
      name: item.product.name,
      bannerImage: item.product.bannerImage,
      category: item.product.category,
      salePrice: item.product.salePrice,
      quantity: item.quantity
    }));
// console.log(items)
    res.json({ success: true, cart:items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;