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
}

export default OrderSupplierService;
