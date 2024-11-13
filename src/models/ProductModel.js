import { GET_DB } from "~/config/mysql";

class Product {
  // Lấy tất cả sản phẩm theo top 1 image - discount - category - productVariation price  min max
  static async getAllProduct() {
    const db = GET_DB();
    const [rows] = await db.query(`
              SELECT p.id AS ProductID,
              p.productName,
              pv.Price AS VariationPrice,
              d.discount AS MaxDiscount,
              (pv.Price) * (1 - d.discount / 100) AS FinalPrice,
              (SELECT pi.IMG_URL 
                FROM productimage pi 
                WHERE pi.ProductID = p.id 
                ORDER BY pi.id ASC 
                LIMIT 1) AS FirstImage,
              c.categoryName AS CategoryName,
              sc.SupCategoryName AS SupCategoryName
        FROM product p
        JOIN productvariation pv ON p.id = pv.ID_Product
        JOIN variation_discount vd ON pv.id = vd.ID_Variation
        JOIN discount d ON vd.ID_Discount = d.id
        LEFT JOIN supcategory sc ON p.ID_SupCategory = sc.id
        LEFT JOIN category c ON sc.categoryId = c.id
        WHERE vd.status = 1 
          AND NOW() BETWEEN vd.StartDate AND vd.EndDate
          AND vd.ID_Variation = (
              SELECT vd_inner.ID_Variation
              FROM productvariation pv_inner
              JOIN variation_discount vd_inner ON pv_inner.id = vd_inner.ID_Variation
              JOIN discount d_inner ON vd_inner.ID_Discount = d_inner.id
              WHERE vd_inner.status = 1 
                AND NOW() BETWEEN vd_inner.StartDate AND vd_inner.EndDate
                AND pv_inner.ID_Product = p.id
              ORDER BY d_inner.discount DESC, pv_inner.Price ASC
              LIMIT 1
          )
        GROUP BY p.id, p.productName, pv.Price, d.discount, c.categoryName, sc.SupCategoryName
        ORDER BY FinalPrice DESC
        LIMIT 0, 1000;

    `);
    return rows;
  }

  static async getAll() {
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
          'isDelete', pv.isDelete,
          'updatedAt', pv.updatedAt
        )) AS variations 
      FROM 
        Product p
      LEFT JOIN 
        SupCategory sc ON p.ID_SupCategory = sc.id
      LEFT JOIN 
        category c ON sc.categoryId = c.id
      LEFT JOIN 
        productVariation pv ON p.id = pv.ID_Product
      WHERE
        p.isDelete = 0
      GROUP BY 
        p.id, p.productName, p.createdAt, sc.SupCategoryName, c.categoryName;
    `);
    return rows;
  }
  static async getTop10NewestProducts() {
    const db = GET_DB();
    const [rows] = await db.query(`
            WITH RankedProductVariations AS (
            SELECT 
                p.id AS product_id,
                p.productName,
                pv.size,
                IFNULL(d.discount, 0) AS discount_percentage,
                pv.Price AS original_price,
                pv.Price - (pv.Price * IFNULL(d.discount, 0) / 100) AS final_price,
                (pv.Price * IFNULL(d.discount, 0) / 100) AS discount_amount, 
                pv.stock,
                p.createdAt,
                sc.SupCategoryName AS SupCategoryName,
                c.categoryName AS categoryName,
                ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY IFNULL(d.discount, 0) DESC, pv.Price ASC) AS rn,
                CASE 
     WHEN DATEDIFF(CURDATE(), p.createdAt) <= 30 THEN 'true' 
     ELSE 'false'
    END AS isNew
            FROM product p
            JOIN productvariation pv ON p.id = pv.ID_Product
            LEFT JOIN variation_discount vd ON pv.id = vd.ID_Variation
            LEFT JOIN discount d ON vd.ID_Discount = d.id
            LEFT JOIN supcategory sc ON p.ID_SupCategory = sc.id
            LEFT JOIN category c ON sc.categoryId = c.id 
            WHERE (vd.status = 1 OR vd.status IS NULL)
        )
        SELECT 
            rpv.product_id,
            rpv.productName,
            rpv.size,
            rpv.original_price,
            rpv.discount_percentage,
            rpv.discount_amount,
            rpv.final_price,  
            rpv.stock,
            rpv.createdAt,
            rpv.SupCategoryName,
            rpv.categoryName, 
            rpv.isNew,   
            (SELECT pi.IMG_URL 
            FROM productimage pi 
            WHERE pi.ProductID = rpv.product_id 
            ORDER BY pi.id ASC 
            LIMIT 1) AS FirstImage
        FROM RankedProductVariations rpv
        WHERE rpv.rn = 1 
        ORDER BY rpv.createdAt DESC;
    `);
    return rows;
  }
  static async create(productData) {
    const { ID_SupCategory, productName, description, images, variations } =
      productData;
    const db = GET_DB();

    try {
      await db.query("START TRANSACTION");

      const [productResult] = await db.query(
        "INSERT INTO Product (ID_SupCategory, productName, description, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, 0, NOW(), NOW())",
        [ID_SupCategory, productName, description]
      );

      const productId = productResult.insertId;

      if (images && images.length > 0) {
        for (const image of images) {
          await db.query(
            "INSERT INTO ProductImage (ProductID, IMG_URL) VALUES (?, ?)",
            [productId, image]
          );
        }
      }

      if (variations && variations.length > 0) {
        for (const variation of variations) {
          await db.query(
            "INSERT INTO productVariation (ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
            [productId, variation.size, variation.Price, variation.stock]
          );
        }
      }

      await db.query("COMMIT");

      return { id: productId, ...productData };
    } catch (error) {
      await db.query("ROLLBACK");

      if (error.message.includes("Lock wait timeout exceeded")) {
        console.error("Lock wait timeout, please try again later.");
        throw new Error("Lock wait timeout, please try again later.");
      } else {
        throw error;
      }
    }
  }

  static async update(id, productData) {
    const { ID_SupCategory, productName, description, images, variations } =
      productData;
    const db = GET_DB();

    try {
      await db.query("START TRANSACTION");

      await db.query(
        "UPDATE Product SET ID_SupCategory = ?, productName = ?, description = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
        [ID_SupCategory, productName, description, id]
      );

      if (images && images.length > 0) {
        await db.query("DELETE FROM ProductImage WHERE ProductID = ?", [id]);

        const imagePromises = images.map((image) => {
          return db.query(
            "INSERT INTO ProductImage (ProductID, IMG_URL, createdAt) VALUES (?, ?, NOW())",
            [id, image]
          );
        });
        await Promise.all(imagePromises);
      }

      if (variations && variations.length > 0) {
        await db.query("DELETE FROM productVariation WHERE ID_Product = ?", [
          id,
        ]);

        const variationPromises = variations.map((variation) => {
          return db.query(
            "INSERT INTO productVariation (ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
            [id, variation.size, variation.Price, variation.stock]
          );
        });
        await Promise.all(variationPromises);
      }

      await db.query("COMMIT");

      return { id, ...productData };
    } catch (error) {
      await db.query("ROLLBACK");

      console.error("Error updating product:", error);
      throw new Error("Update failed. Please try again.");
    }
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
          (SELECT JSON_ARRAYAGG(JSON_OBJECT(
              'image_id', img.id,
              'image_url', img.IMG_URL
          )) 
          FROM productImage img 
          WHERE img.ProductID = p.id) AS images,
          JSON_ARRAYAGG(JSON_OBJECT(
              'variation_id', pv.id,
              'size', pv.size,
              'price', pv.Price,
              'stock', pv.stock,
              'isDelete', pv.isDelete
          )) AS variations,
          MIN(pv.Price) AS min_price,  
          MAX(pv.Price) AS max_price  
      FROM 
          Product p
      LEFT JOIN 
          SupCategory sc ON p.ID_SupCategory = sc.id
      LEFT JOIN 
          category c ON sc.categoryId = c.id
      LEFT JOIN 
          productVariation pv ON p.id = pv.ID_Product
      WHERE
          p.isDelete = 0 AND p.id = ?
      GROUP BY 
          p.id, p.productName, p.description, sc.SupCategoryName, c.categoryName;

    `,
      [productId]
    );

    return rows[0] || null;
  }
}

export default Product;
