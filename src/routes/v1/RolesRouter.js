import express from "express";
import RolesController from "~/controllers/RoleControler";

const router = express.Router();

router.get("/", RolesController.getAllRoles);

router.get("/:id", RolesController.getRoleById);
router.post("/assign", RolesController.addRoleToEmployee);

router.delete("/remove", RolesController.removeRoleFromEmployee);
export const RolesRoutes = router;
