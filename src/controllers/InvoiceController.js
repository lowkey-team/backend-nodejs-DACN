import InvoiceService from "~/services/InvoiceService";

class InvoiceController {
  static async createInvoice(req, res) {
    try {
      const invoiceData = req.body;
      const result = await InvoiceService.createInvoice(invoiceData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateInvoice(req, res) {
    console.log("Dữ liệu hóa đơn nhận được:", req.body);
    try {
      const invoiceData = req.body;
      const result = await InvoiceService.updateInvoice(invoiceData);
      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi cập nhật hóa đơn:", error.message);
      res.status(500).json({ message: error.message });
    }
  }

  static async getInvoiceByIdUser(req, res) {
    try {
      const { id_user, orderStatus } = req.params;

      if (!id_user || !orderStatus) {
        return res
          .status(400)
          .json({ message: "Thiếu tham số id_user hoặc orderStatus" });
      }

      const result = await InvoiceService.getInvoiceByIdUser(
        id_user,
        orderStatus
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      res.status(500).json({
        message: `Lỗi khi tìm hóa đơn của người dùng: ${error.message}`,
      });
    }
  }

  static async getInvoiceByIdUser(req, res) {
    try {
      const { id_user, orderStatus } = req.params;

      if (!id_user || !orderStatus) {
        return res
          .status(400)
          .json({ message: "Thiếu tham số id_user hoặc orderStatus" });
      }

      const result = await InvoiceService.getInvoiceByIdUser(
        id_user,
        orderStatus
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      res.status(500).json({
        message: `Lỗi khi tìm hóa đơn của người dùng: ${error.message}`,
      });
    }
  }

  static async getInvoiceAll(req, res) {
    try {
      const result = await InvoiceService.getInvoiceAll();
      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      res.status(500).json({
        message: `Lỗi khi tìm hóa đơn của người dùng: ${error.message}`,
      });
    }
  }

  static async getInvoiceDetailFindByID_Invoice(req, res) {
    try {
      const { ID_Invoice } = req.params;

      if (!ID_Invoice) {
        return res.status(400).json({ message: "Thiếu tham số ID_Invoice" });
      }

      const result = await InvoiceService.getInvoiceDetailFindByID_Invoice(
        ID_Invoice
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm chi tiết hóa đơn:", error);
      res.status(500).json({
        message: `Lỗi khi tìm chi tiết hóa đơn: ${error.message}`,
      });
    }
  }

  static async getInvoiceDetailListFindByID(req, res) {
    try {
      const { ID_Invoice } = req.params;

      if (!ID_Invoice) {
        return res.status(400).json({ message: "Thiếu tham số ID_Invoice" });
      }

      const result = await InvoiceService.getInvoiceDetailListFindByID(
        ID_Invoice
      );

      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi tìm chi tiết hóa đơn:", error);
      res.status(500).json({
        message: `Lỗi khi tìm chi tiết hóa đơn: ${error.message}`,
      });
    }
  }
}

export default InvoiceController;
