import returnDetail from "~/models/returnDetailModel";
import cloudinary from "cloudinary";
import fs from "fs";

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Lỗi khi upload hình ảnh lên Cloudinary:", error);
    throw new Error("Không thể tải hình ảnh lên Cloudinary.");
  }
};
class returnDetailService {
  static async getAllReturnDetails() {
    try {
      const data = await returnDetail.getAll();
      return data;
    } catch (error) {
      throw new Error("Không thể lấy dữ liệu từ bảng return_detail.");
    }
  }

  static async createReturnDetail(returnDetailData, file) {
    try {
      const {
        ID_invoiceDetail,
        returnQuantity,
        reason,
        status = "Đang chờ xử lý",
        phoneNumber,
      } = returnDetailData;

      let imageUrl = null;

      // Kiểm tra xem file có tồn tại không
      if (file && file.path) {
        // Upload lên Cloudinary
        imageUrl = await uploadImageToCloudinary(file.path);
      }

      console.log("Image URL from Cloudinary:", imageUrl);

      const createdReturnDetail = await returnDetail.create({
        ID_invoiceDetail,
        returnQuantity,
        reason,
        images: imageUrl || null,
        status,
        phoneNumber,
      });

      return createdReturnDetail;
    } catch (error) {
      console.error("Error in createReturnDetail:", error);
      throw new Error("Không thể tạo mới return_detail.");
    }
  }

  static async updateReturnDetail(id, status) {
    try {
      const updatedReturnDetail = await returnDetail.update(id, status);
      return updatedReturnDetail;
    } catch (error) {
      throw new Error("Không thể cập nhật return_detail.");
    }
  }
}

export default returnDetailService;
