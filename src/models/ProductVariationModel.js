import { GET_DB } from "~/config/mysql";

class ProductVariation {
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM productVariation WHERE isDelete = 0"
    );
    return rows;
  }

  static async updateMultiple(variations) {
    const db = GET_DB();
    const updatePromises = variations.map(async (variation) => {
      const { id, size, Price, stock, isDelete } = variation;
      const existingVariation = await ProductVariation.findById(id);
      if (!existingVariation) {
        throw new Error(`Biến thể sản phẩm với ID ${id} không tồn tại`);
      }
      return db.query(
        "UPDATE productVariation SET size = ?, Price = ?, stock = ?, isDelete = ?, updatedAt = NOW() WHERE id = ?",
        [size, Price, stock, isDelete, id]
      );
    });

    try {
      await Promise.all(updatePromises);
      return { message: "Cập nhật thành công nhiều biến thể sản phẩm" };
    } catch (err) {
      throw new Error(`Lỗi khi cập nhật: ${err.message}`);
    }
  }

  static async create(variationData) {
    const { ID_Product, size, Price, stock } = variationData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO productVariation (ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
      [ID_Product, size, Price, stock, 0]
    );
    return { id: result.insertId, ...variationData };
  }

  static async update(id, variationData) {
    const { size, Price, stock } = variationData;
    const db = GET_DB();
    await db.query(
      "UPDATE productVariation SET size = ?, Price = ?, stock = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [size, Price, stock, id]
    );
    return { id, ...variationData };
  }

  static async delete(id) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE productVariation SET isDelete = 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findById(id) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM productVariation WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  }

  static async createMultiple(variations) {
    const db = GET_DB();

    const values = variations.map((variation) => [
      variation.ID_Product,
      variation.size,
      variation.Price,
      variation.stock,
      0,
      new Date(),
      new Date(),
    ]);

    const [result] = await db.query(
      `INSERT INTO productVariation (ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES ?`,
      [values]
    );

    return result;
  }
}

export default ProductVariation;
