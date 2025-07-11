import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    if (typeof localFilePath === "string") {
      setTimeout(async () => {
        try {
          await fs.promises.unlink(localFilePath);
          console.log(`File ${localFilePath} deleted after upload.`);
        } catch (err) {
          console.error("Failed to delete file:", err.message);
        }
      }, 4000);
    }

    return response;
  } catch (error) {
    console.log("Error occured while uploading on cloudinary");

    if (typeof localFilePath === "string") {
      setTimeout(async () => {
        try {
          await fs.promises.unlink(localFilePath);
          console.log(`File ${localFilePath} deleted after upload.`);
        } catch (err) {
          console.error("Failed to delete file:", err.message);
        }
      }, 4000);
    }
  }
};

export { uploadOnCloudinary };
