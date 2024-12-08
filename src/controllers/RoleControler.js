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
}

export default RolesController;
