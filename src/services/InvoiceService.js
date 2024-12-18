import aprioriMin from "apriori";
const Apriori = require("apriori"); // Thay thế cho import
import Invoice from "~/models/InvoiceModel";
import Product from "~/models/ProductModel";

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

  static async getInvoiceByIdUser(id_user, orderStatus) {
    try {
      const result = await Invoice.getInvoiceByIdUser(id_user, orderStatus);
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async getInvoiceAll() {
    try {
      const result = await Invoice.getInvoiceAll();
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async GetSalesReport(startDate, endDate) {
    try {
      const result = await Invoice.GetSalesReport(startDate, endDate);
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async getInvoiceDetailFindByID_Invoice(ID_Invoice) {
    try {
      const result = await Invoice.getInvoiceDetailFindByID_Invoice(ID_Invoice);
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }

  static async getInvoiceDetailListFindByID(ID_Invoice) {
    try {
      const result = await Invoice.getInvoiceDetailListFindByID(ID_Invoice);
      return result;
    } catch (error) {
      console.error("Lỗi khi tìm hóa đơn của người dùng:", error);
      throw new Error(`Lỗi khi tìm hóa đơn của người dùng: ${error.message}`);
    }
  }
}

export default InvoiceService;
