import FeedbackService from "~/services/FeedbackService";

class FeedbackController {
  static async createFeedback(req, res) {
    console.log("Inside Feedback Controller");
    console.log("Body in Controller:", req.body);
    console.log("File in Controller:", req.file); // Thay req.files bằng req.file

    try {
      const { ID_InvoiceDetail, content, rating } = req.body;
      const file = req.file; // Dùng req.file thay vì req.files

      if (!ID_InvoiceDetail || !content || !rating) {
        return res.status(400).json({ message: "Thiếu thông tin cần thiết!" });
      }

      // Chuyển file lên Cloudinary và nhận URL hình ảnh
      const feedback = await FeedbackService.createFeedback({
        ID_InvoiceDetail,
        content,
        rating,
        ImageFeedback: file, // Chỉ truyền file duy nhất
      });

      res.status(201).json({
        message: "Phản hồi đã được tạo thành công.",
        feedback,
      });
    } catch (err) {
      console.error("Error in Feedback Controller:", err);
      res.status(500).json({ message: err.message });
    }
  }

  static async getFeedbackByProductId(req, res) {
    const { productId } = req.params;

    try {
      const feedbacks = await FeedbackService.getFeedbackByProductId(productId);

      if (feedbacks.length === 0) {
        return res
          .status(404)
          .json({ message: "No feedback found for this product." });
      }

      res.status(200).json(feedbacks);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error.", error: error.message });
    }
  }
}

export default FeedbackController;
