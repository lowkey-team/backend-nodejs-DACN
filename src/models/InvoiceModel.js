import { GET_DB } from "~/config/mysql";

class Invoice {
  static async createInvoice(invoiceData) {
    const {
      userId,
      employeerId = null,
      totalAmount,
      discountAmount,
      finalAmount,
      voucherCode,
      paymentStatus,
      paymentMethod,
      orderStatus,
      note,
      receivedDate,
      shippingAddress,
      phoneNumber,
      customerName,
      items,
    } = invoiceData;

    const db = await GET_DB();
    const connection = await db.getConnection();

    try {
      console.log("Bắt đầu giao dịch tạo hóa đơn...", invoiceData);

      // Bắt đầu giao dịch
      await connection.beginTransaction();

      // Thực hiện query để thêm dữ liệu vào bảng Invoice
      const [invoiceResult] = await connection.query(
        `INSERT INTO Invoice 
          (ID_Employeer, ID_User, totalAmount, discountAmount, finalAmount, voucherCode, 
          paymentStatus, paymentMethod, orderStatus, note, receivedDate, 
          shippingAddress, phoneNumber, customerName) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          employeerId,
          userId,
          totalAmount,
          discountAmount,
          finalAmount,
          voucherCode,
          paymentStatus,
          paymentMethod,
          orderStatus,
          note || null,
          receivedDate || null, // Đảm bảo nhận giá trị của receivedDate
          shippingAddress || null, // Địa chỉ giao hàng có thể null
          phoneNumber || null, // Số điện thoại có thể null
          customerName || null, // Tên khách hàng có thể null
        ]
      );

      console.log("Hóa đơn đã được tạo, ID:", invoiceResult.insertId);
      const invoiceId = invoiceResult.insertId;

      // Thêm chi tiết hóa đơn
      const invoiceDetails = items.map((item) => [
        invoiceId,
        item.productVariationId,
        item.unitPrice,
        item.amount,
        item.quantity,
      ]);

      console.log("Chi tiết hóa đơn:", invoiceDetails);

      // Thực hiện query để thêm chi tiết vào bảng InvoiceDetail
      await connection.query(
        `INSERT INTO InvoiceDetail (ID_Invoice, ID_productVariation, UnitPrice, Amount, Quantity) 
         VALUES ?`,
        [invoiceDetails]
      );

      console.log("Chi tiết hóa đơn đã được thêm thành công.");

      await connection.commit();
      console.log("Giao dịch đã hoàn thành.");

      return {
        message: "Tạo hóa đơn và chi tiết hóa đơn thành công.",
        invoiceId,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Lỗi khi tạo hóa đơn:", error.message);
      throw new Error(`Lỗi khi tạo hóa đơn : ${error.message}`);
    } finally {
      connection.release();
      console.log("Kết thúc giao dịch.");
    }
  }
}

export default Invoice;
