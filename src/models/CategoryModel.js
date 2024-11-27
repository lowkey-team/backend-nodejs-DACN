import { randomBytes } from "crypto";
import { GET_DB } from "~/config/mysql";

class Category {
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(`
            SELECT 
                c.id AS category_id,
                c.categoryName AS category_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', s.id,
                        'SupCategoryName', s.SupCategoryName
                    )
                ) AS subcategories
            FROM 
                category c
            LEFT JOIN 
                SupCategory s ON c.id = s.categoryId
            WHERE 
                c.isDelete = 0
            GROUP BY 
                c.id;
        `);
    return rows;
  }

  static async create(categoryData) {
    const { categoryName } = categoryData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO category (categoryName, isDelete, createdAt, updatedAt) VALUES (?, 0, NOW(), NOW())",
      [categoryName]
    );
    return { id: result.insertId, categoryName };
  }

  static async update(id, categoryData) {
    const { categoryName } = categoryData;
    const db = GET_DB();
    await db.query(
      "UPDATE category SET categoryName = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [categoryName, id]
    );
    return { id, categoryName };
  }

  static async delete(id) {
    const db = GET_DB();
    const [result] = await db.query("DELETE FROM category WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  static async findById(id) {
    console.log("id model", id);
    const db = GET_DB();
    const [rows] = await db.query("SELECT * FROM category WHERE id = ? ", [id]);
    return rows[0] || null;
  }

  static async createSubCategory(subCategoryData) {
    const { categoryId, SupCategoryName } = subCategoryData;

    const categoryCode = categoryId;
    const namePrefix = SupCategoryName.substring(0, 3).toUpperCase();
    const randomSuffix = randomBytes(3)
      .toString("hex")
      .toUpperCase()
      .substring(0, 5);
    const subCategoryCode = categoryCode + namePrefix + randomSuffix;
    console.log("SubCategory Code:", subCategoryCode);

    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO SupCategory (id, SupCategoryName, categoryId, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, 0, NOW(), NOW())",
      [subCategoryCode, SupCategoryName, categoryId]
    );

    return {
      id: subCategoryCode,
      SupCategoryName,
      categoryId,
      subCategoryCode,
    };
  }

  static async updateSubcategory(id, subCategoryData) {
    const { SupCategoryName } = subCategoryData;
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE SupCategory SET SupCategoryName = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [SupCategoryName, id]
    );
    return result.affectedRows > 0 ? { id, SupCategoryName } : null;
  }

  static async deleteSubcategory(id) {
    const db = GET_DB();
    const [result] = await db.query("DELETE FROM SupCategory WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async findByIdSubcategory(id) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM SupCategory WHERE id = ? AND isDelete = 0",
      [id]
    );
    return rows[0] || null;
  }
}

export default Category;
