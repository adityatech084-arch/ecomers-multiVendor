import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";

configDotenv(); // loads .env

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always HTTPS URLs
});

// Helper: Upload file buffer to Cloudinary
export const uploadToCloudinary = (fileBuffer, folder = "products") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" }, // auto detects image/video
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // return the Cloudinary URL
      }
    );

    stream.end(fileBuffer); // send file buffer directly
  });
};


export default cloudinary;