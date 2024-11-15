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
    try {
      const invoiceData = req.body;
      const result = await InvoiceService.updateInvoice(invoiceData);
      res.status(200).json(result);
    } catch (error) {
      console.error("Lỗi khi cập nhật hóa đơn:", error.message);
      res.status(500).json({ message: error.message });
    }
  }
}

export default InvoiceController;
