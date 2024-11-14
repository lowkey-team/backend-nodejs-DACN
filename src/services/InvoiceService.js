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
}

export default InvoiceService;
