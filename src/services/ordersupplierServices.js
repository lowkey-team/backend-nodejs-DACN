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
}

export default OrderSupplierService;
