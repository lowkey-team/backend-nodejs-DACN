import Feedback from "~/models/FeedbackModel";
import cloudinary from "cloudinary";
import fs from "fs";

// Hàm upload hình ảnh lên Cloudinary
const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath);
    fs.unlinkSync(filePath); // Xóa file sau khi upload
    return result.secure_url; // Trả về URL của hình ảnh
  } catch (error) {
    console.error("Lỗi khi upload hình ảnh lên Cloudinary:", error);
    throw new Error("Không thể tải hình ảnh lên Cloudinary.");
  }
};

class FeedbackService {
  static async createFeedback(feedbackData) {
    const {
      ID_InvoiceDetail,
      content,
      rating,
      status = true,
      ImageFeedback,
    } = feedbackData;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5.");
    }

    let imageUrl = null;
    if (ImageFeedback) {
      imageUrl = await uploadImageToCloudinary(ImageFeedback.path);
    }

    return await Feedback.create({
      ID_InvoiceDetail,
      content,
      rating,
      status,
      ImageFeedback: imageUrl || null,
    });
  }

  static async getFeedbackByProductId(productId) {
    try {
      const feedbacks = await Feedback.GetFeedbackByProductId(productId);
      return feedbacks;
    } catch (error) {
      throw new Error(
        "Error fetching feedbacks by product ID: " + error.message
      );
    }
  }
}

export default FeedbackService;
