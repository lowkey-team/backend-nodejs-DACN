import VariationDiscountService from "~/services/variationDiscountService";

class VariationDiscountController {
  static async createVariationDiscount(req, res) {
    try {
      const { ID_Variation, ID_Discount, StartDate, EndDate, status } =
        req.body;
      if (!ID_Variation || !ID_Discount || !StartDate || !EndDate) {
        return res.status(400).json({ message: "Thông tin không đầy đủ" });
      }

      const newVariationDiscount =
        await VariationDiscountService.createVariationDiscount({
          ID_Variation,
          ID_Discount,
          StartDate,
          EndDate,
          status,
        });

      res.status(201).json(newVariationDiscount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lấy tất cả variation_discount
  static async getAllVariationDiscounts(req, res) {
    try {
      const variationDiscounts =
        await VariationDiscountService.getAllVariationDiscounts();
      res.status(200).json(variationDiscounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Lấy variation_discount theo ID
  static async getVariationDiscountById(req, res) {
    try {
      const variationDiscount =
        await VariationDiscountService.getVariationDiscountById(req.params.id);
      if (!variationDiscount) {
        return res
          .status(404)
          .json({ message: "Variation discount không tồn tại" });
      }
      res.status(200).json(variationDiscount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Cập nhật variation_discount
  static async updateVariationDiscount(req, res) {
    try {
      const { id, ID_Variation, ID_Discount, StartDate, EndDate, status } =
        req.body;
      if (!ID_Variation || !ID_Discount || !StartDate || !EndDate) {
        return res.status(400).json({ message: "Thông tin không đầy đủ" });
      }

      const updatedVariationDiscount =
        await VariationDiscountService.updateVariationDiscount(id, {
          ID_Variation,
          ID_Discount,
          StartDate,
          EndDate,
          status,
        });

      if (!updatedVariationDiscount) {
        return res
          .status(404)
          .json({ message: "Variation discount không tồn tại" });
      }
      res.status(200).json(updatedVariationDiscount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Xóa variation_discount theo ID
  static async deleteVariationDiscount(req, res) {
    try {
      const result = await VariationDiscountService.deleteVariationDiscount(
        req.params.id
      );
      if (!result) {
        return res
          .status(404)
          .json({ message: "Variation discount không tồn tại" });
      }
      res.status(200).json({ message: "Variation discount đã được xóa" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Lọc biến thể sản phẩm theo danh mục và danh mục con
  static async getProductVariations(req, res) {
    const { categoryId, subCategoryId } = req.query;

    if (!categoryId) {
      return res.status(400).json({ message: "Vui lòng chọn danh mục" });
    }

    try {
      const variations = await VariationDiscountService.getProductVariations(
        categoryId,
        subCategoryId
      );
      res.status(200).json(variations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

static async createMultipleVariationDiscounts(req, res) {
  console.log("Body nhận được:", req.body);

  try {
      const data = Array.isArray(req.body) ? req.body : [req.body];
      console.log("Dữ liệu đã chuyển thành mảng:", data);
      const variationDiscounts = await VariationDiscountService.createMultipleVariationDiscounts(data);
      res.status(200).json({
          message: "Tạo giảm giá thành công cho các biến thể",
          affectedRows: variationDiscounts.affectedRows,
      });
  } catch (err) {
      console.log("Lỗi khi thêm giảm giá:", err);
      res.status(500).json({ message: err.message });
  }
}

static async getDiscountedVariations(req, res) {
  try {
    const discountedVariations = await VariationDiscountService.getDiscountedVariations();
    res.status(200).json(discountedVariations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



}

export default VariationDiscountController;
