import DiscountService from "~/services/discountService";

class DiscountController {
  static async createDiscount(req, res) {
    try {
      const { discount } = req.body;
      if (discount === undefined) {
        return res
          .status(400)
          .json({ message: "Discount không được để trống" });
      }
      const newDiscount = await DiscountService.createDiscount(discount);
      res.status(201).json(newDiscount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllDiscounts(req, res) {
    try {
      const discounts = await DiscountService.getAllDiscounts();
      res.status(200).json(discounts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getDiscountById(req, res) {
    try {
      const discount = await DiscountService.getDiscountById(req.params.id);
      if (!discount) {
        return res.status(404).json({ message: "Discount không tồn tại" });
      }
      res.status(200).json(discount);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateDiscount(req, res) {
    try {
      const { id, discount } = req.body;
      if (discount === undefined) {
        return res
          .status(400)
          .json({ message: "Discount không được để trống" });
      }
      const updatedDiscount = await DiscountService.updateDiscount(
        id,
        discount
      );
      if (!updatedDiscount) {
        return res.status(404).json({ message: "Discount không tồn tại" });
      }
      res.status(200).json(updatedDiscount);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteDiscount(req, res) {
    try {
      const result = await DiscountService.deleteDiscount(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Discount không tồn tại" });
      }
      res.status(200).json({ message: "Discount đã được xóa" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default DiscountController;
