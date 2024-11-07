import { GET_DB } from "~/config/mysql";

class ProductVariation {
  // Lấy tất cả các biến thể sản phẩm
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM productVariation WHERE isDelete = 0"
    );
    return rows;
  }

  // Tạo biến thể sản phẩm mới
  static async create(variationData) {
    const { ID_Product, size, Price, stock, ID_discount } = variationData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO productVariation (ID_Product, size, Price, stock, ID_discount, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())",
      [ID_Product, size, Price, stock, ID_discount]
    );
    return { id: result.insertId, ...variationData };
  }

  // Cập nhật thông tin biến thể sản phẩm
  static async update(id, variationData) {
    const { size, Price, stock, ID_discount } = variationData;
    const db = GET_DB();
    await db.query(
      "UPDATE productVariation SET size = ?, Price = ?, stock = ?, ID_discount = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [size, Price, stock, ID_discount, id]
    );
    return { id, ...variationData };
  }

  // Xóa biến thể sản phẩm (đánh dấu là đã xóa)
  static async delete(id) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE productVariation SET isDelete = 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  // Tìm biến thể sản phẩm theo ID
  static async findById(id) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM productVariation WHERE id = ? AND isDelete = 0",
      [id]
    );
    return rows[0] || null;
  }

  static async createMultiple(variations) {
    const db = GET_DB();

    // Tạo mảng các giá trị từ mảng variations
    const values = variations.map((variation) => [
      variation.ID_Product,
      variation.size,
      variation.Price,
      variation.stock,
      variation.ID_discount,
      variation.isDelete,
      variation.createdAt,
      variation.updatedAt,
    ]);

    // Thực hiện truy vấn SQL để chèn nhiều bản ghi vào bảng productVariation
    const [result] = await db.query(
      `
        INSERT INTO productVariation (ID_Product, size, Price, stock, ID_discount, isDelete, createdAt, updatedAt)
        VALUES ?
    `,
      [values]
    );

    return result;
  }
}

export default ProductVariation;
