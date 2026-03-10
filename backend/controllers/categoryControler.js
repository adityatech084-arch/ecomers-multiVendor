import Category from "../models/Category.js";
import Product from "../models/Product.js"
// 1️⃣ Create new top-level category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const vendorId = req.vendor._id;

    const exists = await Category.findOne({ slug, vendor: vendorId });
    if (exists) return res.status(400).json({ success: false, message: "Category already exists" });

    const category = new Category({ name, slug, vendor: vendorId, subcategories: [] });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 2️⃣ Add subcategory to existing category
export const addSubcategory = async (req, res) => {
  try {
    const { categoryId, name, slug } = req.body;
    const vendorId = req.vendor._id;

    const category = await Category.findOne({ _id: categoryId, vendor: vendorId });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    const exists = category.subcategories.find(sub => sub.slug === slug);
    if (exists) return res.status(400).json({ success: false, message: "Subcategory already exists" });

    category.subcategories.push({ name, slug });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 3️⃣ Get all categories for a vendor
export const getCategoriesByVendor = async (req, res) => {
  try {
    const vendorId = req.vendor._id;
    const categories = await Category.find({ vendor: vendorId });
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 4️⃣ Update top-level category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, isActive } = req.body;
    const vendorId = req.vendor._id;

    const category = await Category.findOne({ _id: id, vendor: vendorId });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    if (name) category.name = name;
    if (slug) category.slug = slug;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 5️⃣ Delete top-level category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.vendor._id;

    const category = await Category.findOne({ _id: id, vendor: vendorId });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    await category.deleteOne();
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 6️⃣ Update subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    const { name, slug, isActive } = req.body;
    const vendorId = req.vendor._id;

    const category = await Category.findOne({ _id: categoryId, vendor: vendorId });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    const sub = category.subcategories.id(subcategoryId);
    if (!sub) return res.status(404).json({ success: false, message: "Subcategory not found" });

    if (name) sub.name = name;
    if (slug) sub.slug = slug;
    if (isActive !== undefined) sub.isActive = isActive;

    await category.save();
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 7️⃣ Delete subcategory

export const deleteSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.params;
    const vendorId = req.vendor._id;

    // 1️⃣ Find the category for this vendor
    const category = await Category.findOne({ _id: categoryId, vendor: vendorId });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    // 2️⃣ Filter out the subcategory to delete
    const originalLength = category.subcategories.length;
    category.subcategories = category.subcategories.filter(
      (sub) => sub._id.toString() !== subcategoryId
    );

    if (category.subcategories.length === originalLength) {
      return res.status(404).json({ success: false, message: "Subcategory not found" });
    }

    // 3️⃣ Save category
    await category.save();

    // 4️⃣ Return updated category
    res.status(200).json({ success: true, category });
  } catch (err) {
    console.error("Delete subcategory error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



// Get products by category name
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    // Fetch products matching the category (case-insensitive)
    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const regex = new RegExp(`^${escapeRegex(categoryName)}$`, "i");

// const products = await Product.find({ category: { $regex: regex }  });

const products = await Product.find({
  $or: [
    { category: { $regex: regex } },
    { subCategory: { $regex: regex } } // check subcategory too
  ]
});

    if (!products || products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found in this category" });
    }

    res.status(200).json({ success: true, products });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};