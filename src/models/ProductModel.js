import { GET_DB } from "~/config/mysql";

class Product {
  // Lấy tất cả sản phẩm theo top 1 image - discount - category - productVariation price  min max
  static async getAllProduct () {
    const db = GET_DB();
    const [rows] = await db.query(`
                SELECT 
                    p.id AS product_id,
                    p.productName,
                    p.isDelete,
                    p.createdAt,
                    p.updatedAt,
                    sc.SupCategoryName AS subcategory_name,
                    c.categoryName AS category_name,
                    (SELECT img.IMG_URL
                    FROM ProductImage img 
                    WHERE img.ProductID = p.id LIMIT 1) AS images,
                    MIN(CASE 
                            WHEN d.discount IS NOT NULL 
                            THEN pv.Price * (1 - d.discount / 100) 
                            ELSE pv.Price 
                        END) AS min_price,
                    MAX(CASE 
                            WHEN d.discount IS NOT NULL 
                            THEN pv.Price * (1 - d.discount / 100) 
                            ELSE pv.Price 
                        END) AS max_price
                FROM 
                    Product p
                LEFT JOIN 
                    SupCategory sc ON p.ID_SupCategory = sc.id
                LEFT JOIN 
                    category c ON sc.categoryId = c.id
                LEFT JOIN 
                    productVariation pv ON p.id = pv.ID_Product
                LEFT JOIN 
                    Discount d ON pv.ID_discount = d.id
                WHERE
                    p.isDelete = 0 
                    AND pv.isDelete = 0
                GROUP BY 
                    p.id, p.productName, p.isDelete, p.createdAt, p.updatedAt, sc.SupCategoryName, c.categoryName
                LIMIT 0, 1000;
            `);
    return rows;
  }

  static async getAll () {
    const db = GET_DB();
    const [rows] = await db.query(`
                 SELECT 
            p.id AS product_id,
            p.productName,
            p.createdAt,
            sc.SupCategoryName AS subcategory_name,
            c.categoryName AS category_name,
            (SELECT img.IMG_URL
            FROM productImage img 
            WHERE img.ProductID = p.id LIMIT 1) AS images,
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
            productVariation pv ON p.id = pv.ID_Product
        LEFT JOIN 
            Discount d ON pv.ID_discount = d.id
        WHERE
            p.isDelete = 0
        GROUP BY 
            p.id, p.productName,p.createdAt, sc.SupCategoryName, c.categoryName;
            `);
    return rows;
  }

  static async create(productData) {
    const { ID_SupCategory, productName, description } = productData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO Product (ID_SupCategory, productName, description, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, 0, NOW(), NOW())",
      [ID_SupCategory, productName, description]
    );
    return { id: result.insertId, ...productData };
  }

  static async update(id, productData) {
    const { ID_SupCategory, productName, description } = productData;
    const db = GET_DB();
    await db.query(
      "UPDATE Product SET ID_SupCategory = ?, productName = ?, description = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [ID_SupCategory, productName, description, id]
    );
    return { id, ...productData };
  }

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
    const [rows] = await db.query(
      `
        SELECT 
            p.id AS product_id,
            p.productName,
            p.description,
            sc.SupCategoryName AS subcategory_name,
            c.categoryName AS category_name,
            (SELECT JSON_ARRAYAGG(img.IMG_URL) 
            FROM productImage img 
            WHERE img.ProductID = p.id) AS images,
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
            productVariation pv ON p.id = pv.ID_Product
        LEFT JOIN 
            Discount d ON pv.ID_discount = d.id
        WHERE
            p.isDelete = 0 and p.id = ?
        GROUP BY 
            p.id, p.productName, p.description, sc.SupCategoryName, c.categoryName;
    `,
      [productId]
    );
    return rows[0] || null;
  }
}

export default Product;
