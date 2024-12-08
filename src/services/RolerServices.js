import RoleModel from "~/models/RoleModel";

class RoleService {
  static async getRoleById(id) {
    try {
      const role = await RoleModel.findById(id);
      if (!role || role.length === 0) {
        throw new Error("Role not found");
      }
      return role;
    } catch (error) {
      throw new Error(`Error getting role by id: ${error.message}`);
    }
  }

  static async getAllRoles() {
    try {
      const roles = await RoleModel.getAll();
      if (!roles || roles.length === 0) {
        throw new Error("No roles found");
      }
      return roles;
    } catch (error) {
      throw new Error(`Error getting all roles: ${error.message}`);
    }
  }

  static async addRoleToEmployee(employee_id, role_id) {
    try {
      const result = await RoleModel.addRoleToEmployee(employee_id, role_id);
      return result; // Trả về ID của bản ghi mới
    } catch (error) {
      throw new Error(`Error adding role to employee: ${error.message}`);
    }
  }

  static async removeRoleFromEmployee(employee_id, role_id) {
    try {
      const result = await RoleModel.removeRoleFromEmployee(
        employee_id,
        role_id
      );
      if (result === 0) {
        throw new Error("Role not found for the employee");
      }
      return result; // Trả về số dòng bị ảnh hưởng
    } catch (error) {
      throw new Error(`Error removing role from employee: ${error.message}`);
    }
  }
}

export default RoleService;
