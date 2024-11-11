import ProductVariationService from "~/services/ProductVariationService";

class ProductVariationController {
  static async getAllVariations(req, res) {
    try {
      const variations = await ProductVariationService.getAllVariations();
      res.status(200).json(variations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createVariation(req, res) {
    try {
      const newVariation = await ProductVariationService.createVariation(
        req.body
      );
      res.status(201).json(newVariation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateVariation(req, res) {
    const { id } = req.params;
    try {
      const updatedVariation = await ProductVariationService.updateVariation(
        id,
        req.body
      );
      res.status(200).json(updatedVariation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteVariation(req, res) {
    const { id } = req.params;
    try {
      const result = await ProductVariationService.deleteVariation(id);
      if (result) {
        res.status(200).json({ message: "Biến thể sản phẩm đã bị xóa" });
      } else {
        res
          .status(404)
          .json({ message: "Biến thể sản phẩm không tồn tạidfdgd" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async findVariationById(req, res) {
    const { id } = req.params;
    try {
      const variation = await ProductVariationService.findVariationById(id);
      res.status(200).json(variation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async createMultiple(req, res) {
    const variations = req.body;
    console.log("Dữ liệu biến thể sản phẩm:", variations);
    try {
      const result = await ProductVariationService.createMultipleVariations(
        variations
      );
      res
        .status(201)
        .json({ message: "Tạo thành công nhiều biến thể", data: result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateMultiple(req, res) {
    const variations = req.body;
    console.log("updateMultiple controller", variations);

    try {
      const result = await ProductVariationService.updateMultiple(variations);
      res.status(200).json({ message: result.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default ProductVariationController;
