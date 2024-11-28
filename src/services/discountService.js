import DiscountModel from "~/models/discountModel";

class DiscountService {
  static async createDiscount(discount) {
    try {
      return await DiscountModel.createDiscount(discount);
    } catch (error) {
      throw new Error("Lỗi khi tạo discount: " + error.message);
    }
  }

  static async getAllDiscounts() {
    try {
      return await DiscountModel.getAllDiscounts();
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách discounts: " + error.message);
    }
  }

  static async getDiscountById(id) {
    try {
      return await DiscountModel.getDiscountById(id);
    } catch (error) {
      throw new Error("Lỗi khi lấy discount theo id: " + error.message);
    }
  }

  static async updateDiscount(id, discount) {
    try {
      return await DiscountModel.updateDiscount(id, discount);
    } catch (error) {
      throw new Error("Lỗi khi cập nhật discount: " + error.message);
    }
  }

  static async deleteDiscount(id) {
    try {
      return await DiscountModel.deleteDiscount(id);
    } catch (error) {
      throw new Error("Lỗi khi xóa discount: " + error.message);
    }
  }
}

export default DiscountService;
