import { GET_DB } from "~/config/mysql";

class RoleModel {
  static async findById(id) {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT * FROM roles WHERE id = ? AND isDelete = 0",
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
      const [rows] = await db.query("SELECT * FROM roles WHERE isDelete = 0");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async addRoleToEmployee(employee_id, role_id) {
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "INSERT INTO employee_roles (employee_id, role_id, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
        [employee_id, role_id]
      );
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  static async removeRoleFromEmployee(employee_id, role_id) {
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "DELETE FROM employee_roles WHERE employee_id = ? AND role_id = ?",
        [employee_id, role_id]
      );
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

export default RoleModel;
