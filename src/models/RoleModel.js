import { GET_DB } from "~/config/mysql";

class RoleModel {
  static async findById(id) {
    const db = GET_DB();
    console.log("id role", id);
    try {
      const [rows] = await db.query(
        `
        SELECT 
          p.id AS permissionId,
          p.name AS permissionName,
          CASE 
              WHEN rp.role_id IS NOT NULL THEN 1 
              ELSE 0  
          END AS hasPermission  
        FROM 
          permissions p
        LEFT JOIN 
          role_permissions rp ON p.id = rp.permission_id AND rp.role_id = ?
        WHERE 
          p.isDelete = 0
          ORDER BY 
        p.name ASC;
        `,
        [id]
      );
      console.log("data role", rows);
      return rows || []; // Trả về mảng rỗng nếu không có dữ liệu
    } catch (error) {
      console.error("Error in findById:", error);
      throw new Error(`Error fetching role permissions: ${error.message}`);
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
