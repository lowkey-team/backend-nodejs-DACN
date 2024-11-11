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
      throw new Error("Biến thể sản phẩm không tồn uodtae");
    }
    return await ProductVariation.update(id, variationData);
  }

  static async deleteVariation(id) {
    const variation = await ProductVariation.findById(id);
    if (!variation) {
      throw new Error("Biến thể sản phẩm không tồn dele");
    }
    return await ProductVariation.delete(id);
  }

  static async findVariationById(id) {
    const variation = await ProductVariation.findById(id);
    if (!variation) {
      throw new Error("Biến thể sản phẩm không tồn tạisdvsdvsdvsdv");
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

  static async updateMultiple(variations) {
    console.log("service");
    try {
      const result = await ProductVariation.updateMultiple(variations);
      return result;
    } catch (err) {
      throw new Error(`Lỗi khi cập nhật nhiều biến thể: ${err.message}`);
    }
  }
}

export default ProductVariationService;
