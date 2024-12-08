import RoleModel from "~/models/RoleModel";

class RoleService {
  static async getRoleById(id) {
    try {
      const role = await RoleModel.findById(id);
      if (!role) {
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
}

export default RoleService;
