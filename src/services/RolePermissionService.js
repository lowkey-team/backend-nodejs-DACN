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

  static async deleteRolePermission(role_id, permission_id) {
    try {
      const isDeleted = await RolePermission.delete(role_id, permission_id);
      if (!isDeleted) {
        throw new Error("Role permission not found or already deleted");
      }
      return { message: "Role permission deleted successfully" };
    } catch (error) {
      throw new Error(`Error in deleteRolePermission: ${error.message}`);
    }
  }
}

export default RolePermissionService;
