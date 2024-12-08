import RolePermissionService from "~/services/RolePermissionService";

class RolePermissionController {
  static async createRolePermission(req, res) {
    try {
      const { role_id, permission_id } = req.body;

      console.log("Role Permission", role_id, permission_id);
      if (!role_id || !permission_id) {
        return res
          .status(400)
          .json({ message: "role_id và permission_id là bắt buộc" });
      }

      const newRolePermission =
        await RolePermissionService.createRolePermission({
          role_id,
          permission_id,
        });
      res.status(201).json(newRolePermission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllRolePermissions(req, res) {
    try {
      const rolePermissions =
        await RolePermissionService.getAllRolePermissions();
      res.status(200).json(rolePermissions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllPermission(req, res) {
    try {
      const rolePermissions = await RolePermissionService.getAllPermission();
      res.status(200).json(rolePermissions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateRolePermission(req, res) {
    const { id } = req.params;
    const { role_id, permission_id } = req.body;
    try {
      const updatedRolePermission =
        await RolePermissionService.updateRolePermission(id, {
          role_id,
          permission_id,
        });
      res.status(200).json(updatedRolePermission);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteRolePermission(req, res) {
    const { id } = req.params;
    try {
      const result = await RolePermissionService.deleteRolePermission(id);
      if (result) {
        res.status(200).json({ message: "Phân quyền đã được xóa" });
      } else {
        res.status(404).json({ message: "Phân quyền không tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default RolePermissionController;
