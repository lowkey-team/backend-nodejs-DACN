import { GET_DB } from "~/config/mysql";

class Cart {
  static async addProductToCart(userId, productVariationId, quantity) {
    const db = GET_DB();

    const [existingCart] = await db.query(
      "SELECT * FROM carts WHERE ID_User = ? AND ID_ProductVariation = ?",
      [userId, productVariationId]
    );

    if (existingCart.length > 0) {
      const updatedQuantity = existingCart[0].quantity + quantity;
      await db.query(
        "UPDATE carts SET quantity = ? WHERE ID_User = ? AND ID_ProductVariation = ?",
        [updatedQuantity, userId, productVariationId]
      );
      return {
        message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công.",
      };
    } else {
      const [result] = await db.query(
        "INSERT INTO carts (ID_User, ID_ProductVariation, quantity) VALUES (?, ?, ?)",
        [userId, productVariationId, quantity]
      );
      return {
        message: "Sản phẩm đã được thêm vào giỏ hàng.",
        cartId: result.insertId,
      };
    }
  }

  static async getCartByUserId(userId) {
    const db = GET_DB();
    const [rows] = await db.query(
      `
            SELECT 
                c.id, 
                c.ID_User, 
                c.ID_ProductVariation, 
                c.quantity, 
                sc.SupCategoryName,
                pv.size, 
                pv.stock, 
                pv.isDelete, 
                pv.Price,  
                p.productName,
                COALESCE(d.discount, 0) AS discount,
                pv.Price - (pv.Price * COALESCE(d.discount, 0) / 100) AS discounted_price,
                (SELECT pi.IMG_URL
                FROM productimage pi
                WHERE pi.ProductID = p.id
                ORDER BY pi.id ASC
                LIMIT 1) AS first_image
            FROM 
                carts c 
            INNER JOIN 
                productvariation pv ON c.ID_ProductVariation = pv.id 
            INNER JOIN 
                product p ON pv.ID_Product = p.id
            INNER JOIN 
                supcategory sc ON p.ID_SupCategory = sc.id
            LEFT JOIN 
                variation_discount vd ON pv.id = vd.ID_Variation
            LEFT JOIN 
                discount d ON vd.ID_Discount = d.id
            WHERE 
                c.ID_User = ?
                AND pv.stock > 0;
            `,
      [userId]
    );
    return rows;
  }

  static async deleteCartById(cartId) {
    const db = GET_DB();
    const [result] = await db.query("DELETE FROM carts WHERE id = ?", [cartId]);
    return result.affectedRows;
  }

  static async deleteMultipleCartsById(cartIds) {
    const db = GET_DB();
    const [result] = await db.query("DELETE FROM carts WHERE id IN (?)", [
      cartIds,
    ]);
    return result.affectedRows;
  }
}

export default Cart;
