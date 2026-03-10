import mongoose from "mongoose";

const specSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory:{
      type:String,
      default:""
    },
    brand: { type: String, trim: true },
    sku: { type: String, required: true, unique: true, trim: true },
    
    basePrice: { type: Number, required: true },
    salePrice: { type: Number },
    stock: { type: Number, default: 0 },
    weight: { type: Number },
    dimensions: { type: String },

    features: { type: [String], default: [] },
    specs: { type: [specSchema], default: [] },

    bannerImage: { type: String }, // Cloudinary URL
    gallery: { type: [String], default: [] }, // Array of Cloudinary URLs

    rating: { type: String, default: "0" },
    isFeatured: { type: Boolean, default: false },
    isHotDeal: { type: Boolean, default: false },

    seoTitle: { type: String },
    seoKeywords: { type: String },
vendor: { type: mongoose.Schema.Types.ObjectId, ref: "vendors", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // automatically manage createdAt & updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;