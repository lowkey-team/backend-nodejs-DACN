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

  static async findByIDOrderSupplier(req, res) {
    const { id } = req.params;
    try {
      const wareHouse = await OrderSupplierService.findByIDOrderSupplier(id);
      res.status(200).json(wareHouse);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateOrderStatus(req, res) {
    const { orderSupplierId, orderStatus, paymentStatus } = req.body;

    try {
      const result = await OrderSupplierService.updateOrderStatus(
        orderSupplierId,
        orderStatus,
        paymentStatus
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async updateOrderSupplierDetail(req, res) {
    const { id, importQuantity, status, unitPrice } = req.body;
    console.log(
      `updateOrderSupplierDetail", id: ${id}, importQuantity: ${importQuantity}, status: ${unitPrice}`
    );
    console.log("id order supplier detail services: ", id);

    try {
      const result = await OrderSupplierService.updateOrderSupplierDetail({
        id,
        importQuantity,
        status,
        unitPrice,
      });
      res.status(200).json({
        message: "Cập nhật chi tiết đơn hàng thành công",
        result,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error.message);
      res.status(500).json({
        message: `Lỗi khi cập nhật chi tiết đơn hàng: ${error.message}`,
      });
    }
  }
}
export default orderSupplierController;
