import { GET_DB } from "~/config/mysql";

class Image {
  static async create(imageData) {
    const { ProductID, IMG_URL } = imageData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO ProductImage (ProductID, IMG_URL) VALUES (?, ?)",
      [ProductID, IMG_URL]
    );
    return { id: result.insertId, ...imageData };
  }

  static async delete(ids) {
    const db = GET_DB();
    const [result] = await db.query(
      "DELETE FROM ProductImage WHERE id IN (?)",
      [ids]
    );
    return result.affectedRows > 0;
  }
}

export default Image;
