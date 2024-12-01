import RoleModel from "~/models/RoleModel";
import RolePermission from "~/models/RolePermissionModel";

class RolePermissionService {
  static async createRolePermission(rolePermissionData) {
    const { role_id, permission_id } = rolePermissionData;

    const roleExists = await RoleModel.findById(role_id);
    if (!roleExists) {
      throw new Error("Vai trò không tồn tại");
    }

    const permissionExists = await Permission.findById(permission_id);
    if (!permissionExists) {
      throw new Error("Quyền không tồn tại");
    }

    return await RolePermission.create(rolePermissionData);
  }

  static async getAllRolePermissions() {
    return await RolePermission.getAll();
  }

  static async updateRolePermission(id, rolePermissionData) {
    return await RolePermission.update(id, rolePermissionData);
  }

  static async deleteRolePermission(id) {
    return await RolePermission.delete(id);
  }
}

export default RolePermissionService;
