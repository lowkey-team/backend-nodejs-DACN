import { GET_DB } from "~/config/mysql";

class Feedback {
  static async create(feedbackData) {
    const db = GET_DB();
    const { ID_InvoiceDetail, content, rating, status, ImageFeedback } =
      feedbackData;

    const [result] = await db.query(
      `INSERT INTO Feedback (ID_InvoiceDetail, content, rating, status, ImageFeedback, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [ID_InvoiceDetail, content, rating, status, ImageFeedback]
    );

    return {
      id: result.insertId,
      ID_InvoiceDetail,
      content,
      rating,
      status,
      ImageFeedback,
    };
  }

  static async GetFeedbackByProductId(productId) {
    const db = GET_DB();
    const query = `CALL GetFeedbackByProductId(?);`;

    try {
      const [result] = await db.query(query, [productId]);

      return result[0] || [];
    } catch (error) {
      console.error(
        "Error calling stored procedure GetFeedbackByProductId:",
        error
      );
      throw error;
    }
  }

  static async findById(id) {
    const db = GET_DB();
    const [rows] = await db.query(`SELECT * FROM Feedback WHERE id = ?`, [id]);
    return rows[0];
  }
}

export default Feedback;
