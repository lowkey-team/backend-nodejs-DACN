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
          receivedDate || null,
          shippingAddress || null,
          phoneNumber || null,
          customerName || null,
        ]
      );

      console.log("Hóa đơn đã được tạo, ID:", invoiceResult.insertId);
      const invoiceId = invoiceResult.insertId;

      const invoiceDetails = items.map((item) => [
        invoiceId,
        item.productVariationId,
        item.unitPrice,
        item.amount,
        item.quantity,
      ]);

      console.log("Chi tiết hóa đơn:", invoiceDetails);

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
  static async updateInvoice(invoiceData) {
    const {
      invoiceId,
      employeerId,
      paymentStatus,
      orderStatus,
      receivedDate,
      shippingAddress,
      phoneNumber,
    } = invoiceData;

    const db = await GET_DB();
    const connection = await db.getConnection();

    try {
      console.log("Bắt đầu giao dịch cập nhật hóa đơn...", invoiceData);

      await connection.beginTransaction();

      const updateFields = [];
      const updateValues = [];

      if (employeerId) {
        updateFields.push("ID_Employeer = ?");
        updateValues.push(employeerId);
      }
      if (paymentStatus) {
        updateFields.push("paymentStatus = ?");
        updateValues.push(paymentStatus);
      }
      if (orderStatus) {
        updateFields.push("orderStatus = ?");
        updateValues.push(orderStatus);
      }
      if (receivedDate) {
        updateFields.push("receivedDate = ?");
        updateValues.push(receivedDate);
      }
      if (shippingAddress) {
        updateFields.push("shippingAddress = ?");
        updateValues.push(shippingAddress);
      }
      if (phoneNumber) {
        updateFields.push("phoneNumber = ?");
        updateValues.push(phoneNumber);
      }

      if (updateFields.length === 0) {
        throw new Error("Không có dữ liệu cần cập nhật.");
      }

      const query = `UPDATE Invoice 
                     SET ${updateFields.join(", ")} 
                     WHERE ID = ?`;

      updateValues.push(invoiceId);

      await connection.query(query, updateValues);

      console.log("Hóa đơn đã được cập nhật, ID:", invoiceId);

      await connection.commit();
      console.log("Giao dịch đã hoàn thành.");

      return {
        message: "Cập nhật hóa đơn thành công.",
        invoiceId,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Lỗi khi cập nhật hóa đơn:", error.message);
      throw new Error(`Lỗi khi cập nhật hóa đơn : ${error.message}`);
    } finally {
      connection.release();
      console.log("Kết thúc giao dịch.");
    }
  }
  static async getInvoiceByIdUser(id_user, orderStatus) {
    const db = GET_DB();
    const [rows] = await db.query("CALL GetInvoicesByUserAndStatus(?, ?)", [
      id_user,
      orderStatus,
    ]);
    return rows[0];
  }

  static async getInvoiceDetailFindByID_Invoice(ID_Invoice) {
    const db = GET_DB();
    const [rows] = await db.query("call GetInvoiceDetails(?)", [ID_Invoice]);
    return rows[0];
  }
}

export default Invoice;
