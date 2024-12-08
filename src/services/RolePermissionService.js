import RoleModel from "~/models/RoleModel";
import RolePermission from "~/models/RolePermissionModel";
import PermissionModel from "~/models/PermissionModel";

class RolePermissionService {
  static async createRolePermission(rolePermissionData) {
    const { role_id, permission_id } = rolePermissionData;

    console.log("Role Per", role_id, permission_id);
    return await RolePermission.create(rolePermissionData);
  }

  static async getAllRolePermissions() {
    return await RolePermission.getAll();
  }

  static async getAllPermission() {
    return await PermissionModel.getAll();
  }

  static async updateRolePermission(id, rolePermissionData) {
    return await RolePermission.update(id, rolePermissionData);
  }

  static async deleteRolePermission(id) {
    return await RolePermission.delete(id);
  }
}

export default RolePermissionService;
