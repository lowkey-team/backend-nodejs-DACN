import express from "express";
import RolesController from "~/controllers/RoleControler";

const router = express.Router();

router.get("/", RolesController.getAllRoles);

router.get("/:id", RolesController.getRoleById);

export const RolesRoutes = router;
