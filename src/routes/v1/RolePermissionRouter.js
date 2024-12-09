import express from "express";
import RolePermissionController from "~/controllers/RolePermissionController";

const Router = express.Router();

Router.post("/", RolePermissionController.createRolePermission);
Router.get("/", RolePermissionController.getAllRolePermissions);
Router.put("/:id", RolePermissionController.updateRolePermission);
Router.delete(
  "/DeleteRolesPermission",
  RolePermissionController.deleteRolePermission
);
Router.get("/getAllPermission", RolePermissionController.getAllPermission);

export const RolePermissionRouter = Router;
