import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, lowercase: true },
  isActive: { type: Boolean, default: true },
}, { _id: true }); // Mongoose will generate _id for each subcategory

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, lowercase: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    subcategories: [subCategorySchema], // array of subcategories with _id
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category =  mongoose.model("Category", categorySchema);
export default Category;