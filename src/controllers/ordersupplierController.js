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
}
export default orderSupplierController;
