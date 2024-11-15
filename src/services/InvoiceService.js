import Invoice from "~/models/InvoiceModel";

class InvoiceService {
  static async createInvoice(invoiceData) {
    try {
      const result = await Invoice.createInvoice(invoiceData);
      return result;
    } catch (error) {
      throw new Error(`Lỗi khi tạo hóa đơn: ${error.message}`);
    }
  }

  static async updateInvoice(invoiceData) {
    try {
      const result = await Invoice.updateInvoice(invoiceData);
      return result;
    } catch (error) {
      console.error(`Lỗi khi cập nhật hóa đơn: ${error.message}`);
      throw new Error(`Lỗi khi cập nhật hóa đơn: ${error.message}`);
    }
  }
}

export default InvoiceService;
