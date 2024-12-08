import { GET_DB } from "~/config/mysql";

class PermissionModel {
  static async findById(id) {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT * FROM permissions WHERE id = ? AND isDelete = 0",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    const db = GET_DB();
    try {
      const [rows] = await db.query("SELECT id , name FROM permissions ");
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default PermissionModel;
