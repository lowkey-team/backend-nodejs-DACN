import RoleService from "~/services/RolerServices";

class RolesController {
  static async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getRoleById(req, res) {
    const { id } = req.params;
    try {
      const role = await RoleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async addRoleToEmployee(req, res) {
    const { employee_id, role_id } = req.body;
    try {
      const result = await RoleService.addRoleToEmployee(employee_id, role_id);
      res.status(201).json({ message: "Role added successfully", id: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async removeRoleFromEmployee(req, res) {
    const { employee_id, role_id } = req.body;
    try {
      const result = await RoleService.removeRoleFromEmployee(
        employee_id,
        role_id
      );
      if (result === 0) {
        return res
          .status(404)
          .json({ message: "Role not found for the employee" });
      }
      res.status(200).json({ message: "Role removed successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default RolesController;
