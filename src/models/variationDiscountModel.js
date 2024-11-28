import { GET_DB } from "~/config/mysql";

class VariationDiscountModel {
  // Tạo bản ghi variation_discount mới
  static async createVariationDiscount(variationDiscount) {
    const db = await GET_DB();
    const [result] = await db.query(
      "INSERT INTO variation_discount (ID_Variation, ID_Discount, StartDate, EndDate, status) VALUES (?, ?, ?, ?, ?)",
      [
        variationDiscount.ID_Variation,
        variationDiscount.ID_Discount,
        variationDiscount.StartDate,
        variationDiscount.EndDate,
        variationDiscount.status,
      ]
    );
    return { id: result.insertId, ...variationDiscount };
  }

  // Lấy tất cả các bản ghi variation_discount
  static async getAllVariationDiscounts() {
    const db = await GET_DB();
    const [rows] = await db.query("SELECT * FROM variation_discount");
    return rows;
  }

  // Lấy variation_discount theo ID
  static async getVariationDiscountById(id) {
    const db = await GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM variation_discount WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // Cập nhật variation_discount
  static async updateVariationDiscount(id, variationDiscount) {
    const db = await GET_DB();
    const [result] = await db.query(
      `UPDATE variation_discount SET ID_Variation = ?, ID_Discount = ?, StartDate = ?, EndDate = ?, status = ? WHERE id = ?`,
      [
        variationDiscount.ID_Variation,
        variationDiscount.ID_Discount,
        variationDiscount.StartDate,
        variationDiscount.EndDate,
        variationDiscount.status,
        id,
      ]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return { id, ...variationDiscount };
  }

  // Xóa variation_discount theo ID
  static async deleteVariationDiscount(id) {
    const db = await GET_DB();
    const [result] = await db.query(
      "DELETE FROM variation_discount WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default VariationDiscountModel;
