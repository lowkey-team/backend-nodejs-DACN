import Image from "~/models/imageModel";
import cloudinary from "cloudinary";
import fs from "fs";

class ImageService {
  static async createImages(files, data) {
    try {
      console.log("Files received:", files);
      console.log("Data received:", data);

      const uploadPromises = files.map((file) =>
        cloudinary.v2.uploader.upload(file.path).then((result) => {
          fs.unlinkSync(file.path);
          return result.secure_url;
        })
      );

      const imageUrls = await Promise.all(uploadPromises);
      console.log("Uploaded image URLs:", imageUrls);

      const imageRecords = await Promise.all(
        imageUrls.map((url) => Image.create({ ...data, IMG_URL: url }))
      );

      return { success: true, images: imageRecords };
    } catch (error) {
      console.error("Error creating images:", error);
      return { success: false, message: "Unable to create images." };
    }
  }

  static async delete(ids) {
    try {
      if (!Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid or empty ids");
      }

      const isDeleted = await Image.delete(ids);
      return isDeleted;
    } catch (error) {
      console.error("Error deleting images:", error);
      throw new Error("Failed to delete images");
    }
  }
}

export default ImageService;
