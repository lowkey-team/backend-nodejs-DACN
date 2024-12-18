import { GET_DB } from "~/config/mysql";

const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

class OrderModel {
  static async createOrderSupplier(orderData) {
    const {
      supplierId,
      employeerId = null,
      totalPrice,
      orderDate,
      dateOfReceipt,
      items,
    } = orderData;

    const orderSupplierId = `ORDER${supplierId}${generateRandomString(9)}`;

    const db = await GET_DB();
    const connection = await db.getConnection();

    try {
      console.log("Bắt đầu giao dịch tạo đơn hàng nhập...", orderData);

      await connection.beginTransaction();

      await connection.query(
        `INSERT INTO ordersupplier 
          (ID_Supplier, ID_Employeer, TotalPrice, OrderDate, orderSupplier_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          supplierId,
          employeerId,
          totalPrice,
          orderDate,
          orderSupplierId,
        ]
      );

      console.log("Đơn hàng nhập đã được tạo, ID:", orderSupplierId);

      const orderDetails = items.map((item) => [
        generateRandomString(9),
        orderSupplierId,
        item.productVariationId,
        item.quantityOrdered,
        item.unitPrice,
        item.amount,
        item.importQuantity,
        item.status,
        item.note,
        new Date(),
        new Date(),
      ]);

      console.log("Chi tiết đơn hàng nhập:", orderDetails);

      await connection.query(
        `INSERT INTO ordersupplierdetail 
          (id, ID_OrderSupplier, ID_productVariation, QuantityOrdered, UnitPrice, Amount, ImportQuantity, status, note, createdAt, updatedAt) 
         VALUES ?`,
        [orderDetails]
      );

      console.log("Chi tiết đơn hàng nhập đã được thêm thành công.");

      await connection.commit();
      console.log("Giao dịch đã hoàn thành.");

      return {
        message: "Tạo đơn hàng nhập và chi tiết đơn hàng thành công.",
        orderSupplierId,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Lỗi khi tạo đơn hàng nhập:", error.message);
      throw new Error(`Lỗi khi tạo đơn hàng nhập: ${error.message}`);
    } finally {
      connection.release();
      console.log("Kết thúc giao dịch.");
    }
  }

  static async getOrderSupplierAll() {
    const db = GET_DB();

    const query = `
      SELECT 
          os.*, 
          e.FullName AS employee_name,
          e.Phone AS employee_phone,
          s.SupplierName AS supplier_name,
          s.PhoneNumber AS supplier_phone,
          s.Address AS supplier_address
      FROM ordersupplier os
      JOIN employees e ON os.ID_Employeer = e.id
      JOIN supplier s ON os.ID_Supplier = s.id
      WHERE e.isDelete = 0 
        AND s.isDelete = 0
      LIMIT 0, 1000;

    `;

    const [rows] = await db.query(query);
    return rows;
  }

  static async findByIDOrderSupplier(id) {
    console.log("id order supplier: ", id);
    const db = GET_DB();

    try {
      const [rows] = await db.query(`CALL GetOrderSupplierDetails(?)`, [id]);

      return rows[0];
    } catch (error) {
      console.error("Error executing stored procedure:", error);
      throw error;
    }
  }

  static async updateOrderStatus(orderSupplierId, orderStatus, paymentStatus) {
    const db = GET_DB();

    try {
      const [result] = await db.query(
        `UPDATE ordersupplier 
         SET order_status = ?, payment_status = ?, DateOfReceipt = ? 
         WHERE orderSupplier_id = ?`,
        [orderStatus, paymentStatus, new Date(), orderSupplierId]
      );

      if (result.affectedRows === 0) {
        throw new Error(`Không tìm thấy đơn hàng với ID: ${orderSupplierId}`);
      }

      return {
        message: "Cập nhật trạng thái thành công.",
        orderSupplierId,
        orderStatus,
        paymentStatus,
      };
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.message);
      throw new Error(`Lỗi khi cập nhật trạng thái: ${error.message}`);
    }
  }

  static async updateOrderSupplierDetail({
    id,
    importQuantity,
    status,
    unitPrice,
  }) {
    const db = await GET_DB();
    console.log("id order supplier detail: ", id);
    try {
      const [result] = await db.query(
        `UPDATE ordersupplierdetail 
         SET ImportQuantity = ?, status = ?, UnitPrice = ?, updatedAt = NOW() 
         WHERE id = ?`,
        [importQuantity, status, unitPrice, id]
      );
      console.log("Chi tiết đơn hàng cập nhật thành công:", result);
      return result;
    } catch (error) {
      console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error.message);
      throw new Error(`Lỗi trong Model: ${error.message}`);
    }
  }

  static async UpdateTotalPriceOrderSupplier(id) {
    const db = await GET_DB();
    console.log("id order supplier detail: ", id);
    try {
      const [result] = await db.query(`call UpdateTotalPrice(?)`, [id]);
      console.log("Chi tiết đơn hàng cập nhật thành công:", result);
      return result;
    } catch (error) {
      console.error("Lỗi khi cập nhật chi tiết đơn hàng:", error.message);
      throw new Error(`Lỗi trong Model: ${error.message}`);
    }
  }
}

export default OrderModel;
