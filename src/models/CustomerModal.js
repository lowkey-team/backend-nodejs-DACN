import { GET_DB } from "~/config/mysql";

class CustomerModal {
  static async getAll() {
    const db = GET_DB();
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return rows;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw error;
    }
  }

  static async findById(id) {
    const db = GET_DB();
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching customer by ID:", error);
      throw error;
    }
  }

  static async findTotalOrdersByUserId(userId) {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT COUNT(*) AS total_orders FROM invoice WHERE ID_User = ?",
        [userId]
      );
      return rows[0].total_orders || 0;
    } catch (error) {
      console.error("Error fetching total orders for user by ID:", error);
      throw error;
    }
  }

  static async getAllOrder(userId) {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT * FROM invoice WHERE ID_User = ?",
        [userId]
      );
      return rows || [];
    } catch (error) {
      console.error("Error fetching all orders for user by ID:", error);
      throw error;
    }
  }
}

export default CustomerModal;
