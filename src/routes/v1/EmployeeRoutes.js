import express from "express";
import EmployeeController from "~/controllers/EmployeeController";

const Router = express.Router();

Router.post("/", EmployeeController.createEmployee);
Router.get("/", EmployeeController.getAllEmployees);
Router.get("/:id", EmployeeController.getEmployeeById);
Router.put("/:id", EmployeeController.updateEmployee);
Router.delete("/:id", EmployeeController.deleteEmployee);

export const EmployeeRoutes = Router;
