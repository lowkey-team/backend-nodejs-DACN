import CartService from "~/services/Cart Service";

class CartController {
  static async addProductToCart(req, res) {
    const { userId, productVariationId, quantity } = req.body;

    console.log("data: ", userId, productVariationId, quantity);
    try {
      if (!userId || !productVariationId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin hoặc số lượng không hợp lệ." });
      }

      const result = await CartService.addProductToCart(
        userId,
        productVariationId,
        quantity
      );
      return res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      return res.status(500).json({ message: "Đã có lỗi xảy ra." });
    }
  }

  static async getCartByUserId(req, res) {
    try {
      const userId = req.params.userId;
      if (!userId) {
        return res.status(400).json({ message: "ID người dùng không hợp lệ" });
      }
      const cartItems = await CartService.getCartByUserId(userId);
      return res.status(200).json(cartItems);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteCartById(req, res) {
    try {
      const { cartId } = req.params;
      if (!cartId) {
        return res.status(400).json({ message: "ID giỏ hàng không hợp lệ" });
      }
      const result = await CartService.deleteCartById(cartId);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async deleteMultipleCartsById(req, res) {
    try {
      const { cartIds } = req.body;
      if (!cartIds || !Array.isArray(cartIds)) {
        return res.status(400).json({ message: "Tham số không hợp lệ" });
      }
      const result = await CartService.deleteMultipleCartsById(cartIds);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default CartController;
