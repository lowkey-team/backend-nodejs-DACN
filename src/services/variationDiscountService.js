import VariationDiscountModel from "~/models/variationDiscountModel";

class VariationDiscountService {
  static async createVariationDiscount(variationDiscount) {
    try {
      return await VariationDiscountModel.createVariationDiscount(
        variationDiscount
      );
    } catch (error) {
      throw new Error("Lỗi khi tạo variation discount: " + error.message);
    }
  }

  static async getAllVariationDiscounts() {
    try {
      return await VariationDiscountModel.getAllVariationDiscounts();
    } catch (error) {
      throw new Error(
        "Lỗi khi lấy danh sách variation discounts: " + error.message
      );
    }
  }

  static async getVariationDiscountById(id) {
    try {
      return await VariationDiscountModel.getVariationDiscountById(id);
    } catch (error) {
      throw new Error(
        "Lỗi khi lấy variation discount theo id: " + error.message
      );
    }
  }

  static async updateVariationDiscount(id, variationDiscount) {
    try {
      return await VariationDiscountModel.updateVariationDiscount(
        id,
        variationDiscount
      );
    } catch (error) {
      throw new Error("Lỗi khi cập nhật variation discount: " + error.message);
    }
  }

  static async deleteVariationDiscount(id) {
    try {
      return await VariationDiscountModel.deleteVariationDiscount(id);
    } catch (error) {
      throw new Error("Lỗi khi xóa variation discount: " + error.message);
    }
  }

  static async createMultipleVariationDiscounts(variationDiscounts) {
    try {
      return await VariationDiscountModel.createMultipleVariationDiscounts(variationDiscounts);
    } catch (error) {
      throw new Error("Lỗi khi tạo nhiều variation discount: " + error.message);
    }
  }

   // Lọc biến thể sản phẩm
   static async getProductVariations(categoryId, subCategoryId = null) {
    try {
      return await VariationDiscountModel.getProductVariations(categoryId, subCategoryId);
    } catch (error) {
      throw new Error("Lỗi khi lấy biến thể sản phẩm: " + error.message);
    }
  }

}

export default VariationDiscountService;
