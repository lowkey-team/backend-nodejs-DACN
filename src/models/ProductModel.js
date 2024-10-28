import { GET_DB } from "~/config/mysql";

class Product {
  // Lấy tất cả sản phẩm theo image - discount - category - productVariation
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(`
            SELECT 
                p.id AS product_id,
                p.productName,
                p.description,
                sc.SupCategoryName AS subcategory_name,
                c.categoryName AS category_name,
                JSON_ARRAYAGG(img.IMG_URL) AS images, 
                JSON_ARRAYAGG(JSON_OBJECT(
                    'variation_id', pv.id,
                    'size', pv.size,
                    'price', pv.Price,
                    'stock', pv.stock,
                    'discount', d.discount
                    )) AS variations 
                FROM 
                    Product p
                LEFT JOIN 
                    SupCategory sc ON p.ID_SupCategory = sc.id
                LEFT JOIN 
                    category c ON sc.categoryId = c.id
                LEFT JOIN 
                    ProductImage img ON p.id = img.ProductID
                LEFT JOIN 
                    productVariation pv ON p.id = pv.ID_Product
                LEFT JOIN 
                    Discount d ON pv.ID_discount = d.id
                WHERE 
                    p.isDelete = 0
                GROUP BY 
                    p.id;
                    `);
    return rows;
  }

  // Tạo sản phẩm mới
  static async create(productData) {
    const { ID_SupCategory, productName, description } = productData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO Product (ID_SupCategory, productName, description, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, 0, NOW(), NOW())",
      [ID_SupCategory, productName, description]
    );
    return { id: result.insertId, ...productData };
  }

  // Cập nhật sản phẩm
  static async update(id, productData) {
    const { ID_SupCategory, productName, description } = productData;
    const db = GET_DB();
    await db.query(
      "UPDATE Product SET ID_SupCategory = ?, productName = ?, description = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [ID_SupCategory, productName, description, id]
    );
    return { id, ...productData };
  }

  // Xóa sản phẩm (đánh dấu là đã xóa)
  static async delete(id) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE Product SET isDelete = 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findById(productId) {
    const db = GET_DB();
    const [rows] = await db.query(`
        SELECT 
            p.id AS product_id,
            p.productName,
            p.description,
            sc.SupCategoryName AS subcategory_name,
            c.categoryName AS category_name,
            JSON_ARRAYAGG(img.IMG_URL) AS images,
            JSON_ARRAYAGG(JSON_OBJECT(
                'variation_id', pv.id,
                'size', pv.size,
                'price', pv.Price,
                'stock', pv.stock,
                'discount', d.discount
            )) AS variations
        FROM 
            Product p
        LEFT JOIN 
            SupCategory sc ON p.ID_SupCategory = sc.id
        LEFT JOIN 
            category c ON sc.categoryId = c.id
        LEFT JOIN 
            ProductImage img ON p.id = img.ProductID
        LEFT JOIN 
            productVariation pv ON p.id = pv.ID_Product
        LEFT JOIN 
            Discount d ON pv.ID_discount = d.id
        WHERE 
            p.isDelete = 0 AND p.id = ?
        GROUP BY 
            p.id;
    `, [productId]);
    return rows[0] || null;
}
}

export default Product;
