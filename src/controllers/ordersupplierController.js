import OrderSupplierService from "~/services/ordersupplierServices";

class orderSupplierController {
  static async createOrderSupplier(req, res) {
    try {
      const orderData = req.body;
      const result = await OrderSupplierService.createOrderSupplier(orderData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getOrderSupplierAll(req, res) {
    try {
      const result = await OrderSupplierService.getOrderSupplierAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      res.status(500).json({
        message: `Lỗi khi tìm hóa đơn của người dùng: ${error.message}`,
      });
    }
  }
}
export default orderSupplierController;
