import { GET_DB } from "~/config/mysql";

class DiscountModel {
  static async createDiscount(discount) {
    const db = await GET_DB();
    const [result] = await db.query(
      "INSERT INTO discount (discount) VALUES (?)",
      [discount]
    );
    return { id: result.insertId, discount };
  }

  static async getAllDiscounts() {
    const db = await GET_DB();
    const [rows] = await db.query("SELECT * FROM discount");
    return rows;
  }

  static async getDiscountById(id) {
    const db = await GET_DB();
    const [rows] = await db.query("SELECT * FROM discount WHERE id = ?", [id]);
    return rows[0];
  }

  static async updateDiscount(id, discount) {
    console.log("update discount model", id, discount);
    const db = await GET_DB();
    const [result] = await db.query(
      `UPDATE discount SET discount = ? WHERE id = ?`,
      [discount, id]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, discount };
  }

  static async deleteDiscount(id) {
    const db = await GET_DB();
    const [result] = await db.query("DELETE FROM discount WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default DiscountModel;
