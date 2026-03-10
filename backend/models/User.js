import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {     
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,    
        default: ""
    },
    isVerifyOtp: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        default: ""
    },
    otpExpires: {
        type: Date
    },
    ProfileImg:{
        type:String,
        default:""
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;  
