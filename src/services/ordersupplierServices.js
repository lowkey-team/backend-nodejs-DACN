import OrderModel from "~/models/ordersupplierModel";

class OrderSupplierService {
  static async createOrderSupplier(orderData) {
    try {
      const result = await OrderModel.createOrderSupplier(orderData);
      return result;
    } catch (error) {
      throw new Error(`Lỗi khi tạo hóa đơn: ${error.message}`);
    }
  }

  static async getOrderSupplierAll() {
    try {
      const result = await OrderModel.getOrderSupplierAll();
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async findByIDOrderSupplier(id) {
    try {
      const result = await OrderModel.findByIDOrderSupplier(id);
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async updateOrderStatus(orderSupplierId, orderStatus, paymentStatus) {
    try {
      const result = await OrderModel.updateOrderStatus(
        orderSupplierId,
        orderStatus,
        paymentStatus
      );
      return result;
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật trạng thái: ${error.message}`);
    }
  }

  static async updateOrderSupplierDetail({
    id,
    importQuantity,
    status,
    unitPrice,
  }) {
    console.log("id order supplier detail services: ", id);

    try {
      const result = await OrderModel.updateOrderSupplierDetail({
        id,
        importQuantity,
        status,
        unitPrice,
      });
      return result;
    } catch (error) {
      console.error(
        "Lỗi trong Service khi cập nhật chi tiết đơn hàng:",
        error.message
      );
      throw new Error(`Lỗi trong Service: ${error.message}`);
    }
  }
}

export default OrderSupplierService;
