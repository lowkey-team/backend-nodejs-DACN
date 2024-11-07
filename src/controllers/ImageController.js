import ImageService from "~/services/ImageService";

class ImageController {
  static async createImage(req, res) {
    try {
      const files = req.files;
      const data = req.body;

      if (!files) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded." });
      }

      const result = await ImageService.createImages(files, data);

      if (result.success) {
        res.status(201).json({ success: true, image: result.image });
      } else {
        res.status(500).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error("Error in createImage:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create image." });
    }
  }

  static async delete(req, res) {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "Invalid or empty ids" });
      }

      const isDeleted = await ImageService.delete(ids);
      if (isDeleted) {
        return res.status(200).json({ message: "Images deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "No images found with the provided IDs" });
      }
    } catch (error) {
      console.error("Error in ImageController:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ImageController;
