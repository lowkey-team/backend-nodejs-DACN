import Cart from "~/models/cartModel";

class CartService {
  static async addProductToCart(userId, productVariationId, quantity) {
    const cartId = await Cart.addProductToCart(
      userId,
      productVariationId,
      quantity
    );
    return { cartId };
  }

  static async getCartByUserId(userId) {
    const cartItems = await Cart.getCartByUserId(userId);
    return cartItems;
  }

  static async deleteCartById(cartId) {
    const result = await Cart.deleteCartById(cartId);
    if (result === 0) {
      throw new Error("Giỏ hàng không tồn tại");
    }
    return { message: "Xóa giỏ hàng thành công" };
  }

  static async deleteMultipleCartsById(cartIds) {
    const result = await Cart.deleteMultipleCartsById(cartIds);
    if (result === 0) {
      throw new Error("Không có giỏ hàng nào để xóa");
    }
    return { message: "Xóa giỏ hàng thành công" };
  }
}

export default CartService;
