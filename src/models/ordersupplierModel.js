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
          (ID_Supplier, ID_Employeer, TotalPrice, OrderDate, DateOfReceipt, orderSupplier_id) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          supplierId,
          employeerId,
          totalPrice,
          orderDate,
          dateOfReceipt,
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
}

export default OrderModel;
