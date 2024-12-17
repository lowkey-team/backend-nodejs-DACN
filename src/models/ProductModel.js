import { GET_DB } from "~/config/mysql";
const crypto = require("crypto");

class Product {
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
  static async getProductsWithNoDiscount() {
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
      LEFT JOIN 
        variation_discount vd ON pv.id = vd.ID_Variation
      WHERE 
        p.isDelete = 0
        AND (vd.ID_Variation IS NULL)
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
        ORDER BY rpv.categoryName ASC, rpv.SupCategoryName ASC, rpv.productName ASC;
    `);
    return rows;
  }
  static async getProductAllPage() {
    const db = GET_DB();
    const [rows] = await db.query(`call GetRankedProductVariations();
    `);
    return rows[0];
  }

  static async getAllProductsSortedByCategory() {
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
        ORDER BY rpv.categoryName ASC, rpv.SupCategoryName ASC, rpv.productName ASC;
    `);
    return rows;
  }
  static async create(productData) {
    const { ID_SupCategory, productName, description, images, variants } =
      productData;
    const db = GET_DB();

    try {
      await db.query("START TRANSACTION");

      const randomString = crypto.randomBytes(5).toString("hex");

      const productId = `${ID_SupCategory}${randomString}`;

      const [productResult] = await db.query(
        "INSERT INTO Product (id, ID_SupCategory, productName, description, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
        [productId, ID_SupCategory, productName, description]
      );

      if (images && images.length > 0) {
        for (const image of images) {
          await db.query(
            "INSERT INTO ProductImage (ProductID, IMG_URL) VALUES (?, ?)",
            [productId, image]
          );
        }
      }

      if (variants && variants.length > 0) {
        for (const variation of variants) {
          const variationRandomString = crypto.randomBytes(5).toString("hex");
          const variationId = `${productId}${variationRandomString}`;

          const stock = Number(variation.Stock);
          const price = Number(variation.Price);

          if (isNaN(stock) || isNaN(price)) {
            throw new Error("Stock hoặc Price không hợp lệ.");
          }

          await db.query(
            "INSERT INTO productVariation (id, ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())",
            [variationId, productId, variation.VariantName, price, stock]
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

  static async createProductExcel(productsData) {
    const db = GET_DB();

    try {
      await db.query("START TRANSACTION");

      for (const productData of productsData) {
        const { ID_SupCategory, productName, description, images, variants } =
          productData;

        const randomString = crypto.randomBytes(5).toString("hex");
        const productId = `${ID_SupCategory}${randomString}`;

        const [productResult] = await db.query(
          "INSERT INTO Product (id, ID_SupCategory, productName, description, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
          [productId, ID_SupCategory, productName, description]
        );

        if (images && images.length > 0) {
          for (const image of images) {
            await db.query(
              "INSERT INTO ProductImage (ProductID, IMG_URL) VALUES (?, ?)",
              [productId, image]
            );
          }
        }

        if (variants && variants.length > 0) {
          for (const variation of variants) {
            const variationRandomString = crypto.randomBytes(5).toString("hex");
            const variationId = `${productId}${variationRandomString}`;

            const stock = Number(variation.stock);
            const price = Number(variation.Price);

            if (isNaN(stock) || isNaN(price)) {
              throw new Error("Stock hoặc Price không hợp lệ.");
            }

            await db.query(
              "INSERT INTO productVariation (id, ID_Product, size, Price, stock, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())",
              [variationId, productId, variation.size, price, stock]
            );
          }
        }
      }

      await db.query("COMMIT");

      return { message: "Products added successfully." };
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
    console.log("update", id, productData);
    const { ID_SupCategory, productName, description } = productData;
    const db = GET_DB();

    try {
      await db.query("START TRANSACTION");

      await db.query(
        "UPDATE Product SET ID_SupCategory = ?, productName = ?, description = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
        [ID_SupCategory, productName, description, id]
      );

      await db.query("COMMIT");

      return { id, ID_SupCategory, productName, description };
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
            'discount_percentage', IFNULL(d.discount, 0),
            'final_price', pv.Price - (pv.Price * IFNULL(d.discount, 0) / 100),
            'isDelete', pv.isDelete
        )) AS variations,
        MIN(pv.Price - (pv.Price * IFNULL(d.discount, 0) / 100)) AS min_price,
        MAX(pv.Price - (pv.Price * IFNULL(d.discount, 0) / 100)) AS max_price
    FROM 
        Product p
    LEFT JOIN 
        SupCategory sc ON p.ID_SupCategory = sc.id
    LEFT JOIN 
        category c ON sc.categoryId = c.id
    LEFT JOIN 
        productVariation pv ON p.id = pv.ID_Product
    LEFT JOIN 
        variation_discount vd ON pv.id = vd.ID_Variation
    LEFT JOIN 
        discount d ON vd.ID_Discount = d.id
    WHERE
        p.isDelete = 0 AND p.id = ?
    GROUP BY 
        p.id, p.productName, p.description, sc.SupCategoryName, c.categoryName;


    `,
      [productId]
    );

    return rows[0] || null;
  }

  static async GetProductsBySupCategory(supcategoryId) {
    const db = GET_DB();

    try {
      const [rows] = await db.query(
        `
        CALL GetProductsBySupCategory(?);
        `,
        [supcategoryId]
      );

      return rows[0] || null;
    } catch (error) {
      console.error("Error while getting products by supcategory:", error);
      throw error;
    }
  }

  static async GetProductsBySupCategory_Admin(supcategoryId) {
    const db = GET_DB();

    try {
      const [rows] = await db.query(
        `
      SELECT p.id, p.productName,
            MIN(pi.IMG_URL) AS IMG_URL
      FROM productvariation pv
      JOIN product p ON pv.ID_Product = p.id
      LEFT JOIN supcategory sc ON p.ID_SupCategory = sc.id
      LEFT JOIN productimage pi ON pi.ProductID = p.id
      WHERE sc.id = ?
      GROUP BY p.productName , p.id;
        `,
        [supcategoryId]
      );

      return rows;
    } catch (error) {
      console.error("Error while getting products by supcategory:", error);
      throw error;
    }
  }

  static async getInvoiceProductIdsForApriori() {
    const db = GET_DB();

    const query = `
     SELECT 
          JSON_ARRAYAGG(p.ID_Product) AS productIds
      FROM 
          invoice i
      LEFT JOIN 
          (SELECT DISTINCT p.ID_Product, d.ID_Invoice
          FROM invoicedetail d
          LEFT JOIN productvariation p ON d.ID_productVariation = p.id) AS p
      ON i.invoice_id = p.ID_Invoice
      GROUP BY 
          i.invoice_id;
    `;

    const [rows] = await db.query(query);
    return rows;
  }
  static async GetProductsByIds(productIds) {
    const db = GET_DB();

    try {
      const [results] = await db.query("CALL GetProductsByIds(?)", [
        productIds,
      ]);

      return results[0];
    } catch (error) {
      console.error("Lỗi khi gọi stored procedure GetProductsByIds:", error);
      throw new Error("Không thể lấy sản phẩm");
    }
  }

  static async updateStock(ID_Variation, newStock, orderID) {
    const db = GET_DB();

    try {
      // Lấy số lượng tồn cũ
      const [currentStock] = await db.query(
        `SELECT stock FROM productvariation WHERE id = ? AND isDelete = 0`,
        [ID_Variation]
      );

      // Kiểm tra nếu không tìm thấy biến thể hoặc biến thể đã bị xóa
      if (currentStock.length === 0) {
        throw new Error(
          "Không tìm thấy biến thể sản phẩm hoặc biến thể đã bị xóa."
        );
      }

      // Cộng dồn số lượng tồn mới vào số lượng tồn cũ
      const updatedStock = currentStock[0].stock + newStock;

      // Cập nhật lại số lượng tồn trong bảng productvariation
      const [stockUpdateResult] = await db.query(
        `UPDATE productvariation SET stock = ? WHERE id = ? AND isDelete = 0`,
        [updatedStock, ID_Variation]
      );

      // Kiểm tra nếu không có bản ghi nào bị thay đổi
      if (stockUpdateResult.affectedRows === 0) {
        throw new Error(
          "Không tìm thấy biến thể sản phẩm hoặc biến thể đã bị xóa."
        );
      }

      console.log("id giam", orderID);
      // Giảm số lượng đặt hàng trong bảng ordersupplierdetail
      const [orderDetail] = await db.query(
        `SELECT QuantityOrdered, ImportQuantity FROM ordersupplierdetail WHERE id=?`,
        [orderID]
      );

      // Kiểm tra nếu không tìm thấy đơn hàng
      if (orderDetail.length === 0) {
        throw new Error(
          "Không tìm thấy đơn hàng hoặc biến thể sản phẩm trong bảng ordersupplierdetail."
        );
      }

      const updatedQuantityOrdered = orderDetail[0].QuantityOrdered - newStock;
      const updatedImportQuantity = orderDetail[0].ImportQuantity + newStock;

      console.log(
        "id giam sl đặt",
        updatedQuantityOrdered,
        updatedImportQuantity
      );
      // Cập nhật lại số lượng đặt hàng và số lượng đã nhập trong bảng ordersupplierdetail
      const [orderUpdateResult] = await db.query(
        `UPDATE ordersupplierdetail SET QuantityOrdered = ?, ImportQuantity = ? WHERE id=?`,
        [updatedQuantityOrdered, updatedImportQuantity, orderID]
      );

      // Kiểm tra nếu không có bản ghi nào bị thay đổi
      if (orderUpdateResult.affectedRows === 0) {
        throw new Error(
          "Không thể cập nhật số lượng đặt hàng và số lượng nhập."
        );
      }

      return {
        success: true,
        message:
          "Cập nhật số lượng tồn, số lượng đặt và số lượng nhập thành công.",
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default Product;
