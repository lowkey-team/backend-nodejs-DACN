import ProductVariation from "~/models/ProductVariationModel";

class ProductVariationService {
  static async getAllVariations() {
    return await ProductVariation.getAll();
  }

  static async createVariation(variationData) {
    return await ProductVariation.create(variationData);
  }

  static async updateVariation(id, variationData) {
    const variation = await ProductVariation.findById(id);
    if (!variation) {
      throw new Error("Biến thể sản phẩm không tồn tại");
    }
    return await ProductVariation.update(id, variationData);
  }

  static async deleteVariation(id) {
    const variation = await ProductVariation.findById(id);
    if (!variation) {
      throw new Error("Biến thể sản phẩm không tồn tại");
    }
    return await ProductVariation.delete(id);
  }

  static async findVariationById(id) {
    const variation = await ProductVariation.findById(id);
    if (!variation) {
      throw new Error("Biến thể sản phẩm không tồn tại");
    }
    return variation;
  }

  static async createMultipleVariations(variations) {
    try {
      const result = await ProductVariation.createMultiple(variations);
      return result;
    } catch (err) {
      throw new Error(`Lỗi khi tạo nhiều biến thể: ${err.message}`);
    }
  }
}

export default ProductVariationService;
