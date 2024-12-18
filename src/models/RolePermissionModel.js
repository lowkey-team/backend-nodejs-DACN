import { GET_DB } from "~/config/mysql";

class RolePermission {
  static async create(rolePermissionData) {
    const { role_id, permission_id } = rolePermissionData;
    console.log("Role Permission", role_id, permission_id);
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "INSERT INTO role_permissions (role_id, permission_id, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())",
        [role_id, permission_id]
      );
      return { id: result.insertId, role_id, permission_id };
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT rp.*, r.name AS role_name, p.name AS permission_name FROM role_permissions rp JOIN roles r ON rp.role_id = r.id JOIN permissions p ON rp.permission_id = p.id"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, rolePermissionData) {
    const { role_id, permission_id } = rolePermissionData;
    const db = GET_DB();
    try {
      await db.query(
        "UPDATE role_permissions SET role_id = ?, permission_id = ?, updatedAt = NOW() WHERE id = ?",
        [role_id, permission_id, id]
      );
      return { id, role_id, permission_id };
    } catch (error) {
      throw error;
    }
  }

  static async delete(role_id, permission_id) {
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?",
        [role_id, permission_id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting role_permission: ${error.message}`);
    }
  }
}

export default RolePermission;
