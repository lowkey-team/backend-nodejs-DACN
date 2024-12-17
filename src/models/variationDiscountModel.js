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

  // Thêm nhiều bản ghi variation_discount
  static async createMultipleVariationDiscounts(variationDiscounts) {
    const db = await GET_DB();
    const values = variationDiscounts.map(
      (vd) => [vd.ID_Variation, vd.ID_Discount, vd.StartDate, vd.EndDate, vd.status]
    );

    console.log("Dữ liệu INSERT vào SQL:", values);

    const [result] = await db.query(
      `INSERT INTO variation_discount (ID_Variation, ID_Discount, StartDate, EndDate, status)
       VALUES ?`,
      [values]
    );
    return result;
  }

  // Lọc biến thể sản phẩm theo danh mục và danh mục con
  static async getProductVariations(categoryId, subCategoryId = null) {
    const db = await GET_DB();
    const query = `
      SELECT pv.id, p.productName, pv.size, pv.Price 
      FROM productvariation pv
      JOIN product p ON pv.ID_Product = p.id
      JOIN supcategory sc ON p.ID_SupCategory = sc.id
      WHERE sc.categoryId = ? 
      ${subCategoryId ? "AND sc.id = ?" : ""}
      AND pv.isDelete = 0`;

    const params = subCategoryId ? [categoryId, subCategoryId] : [categoryId];
    const [variations] = await db.query(query, params);
    return variations;
  }


}

export default VariationDiscountModel;
