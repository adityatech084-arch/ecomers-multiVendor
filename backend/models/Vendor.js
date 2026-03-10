import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    storeName:{ type: String, required: true,},
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    shopDescription:{type:String,default:""},
    proflieImage: { type: String, default: "https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" },
    shopAddress: { type: String, default: "" },
    role: { type: String, default: "vendor" },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    otp: { type: String, default: "" },
    otpExpires: { type: Date },
    isVerifyOtp: { type: Boolean, default: false },

    isVerified: { type: Boolean, default: false }

}, {
    timestamps: true
});
const Vendor = mongoose.model("vendors", vendorSchema);
export default Vendor;