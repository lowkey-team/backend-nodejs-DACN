import express from "express";
import UserController from "~/controllers/UserController";
import { UserValidation } from "~/validations/UsersValidation";

const Router = express.Router();

Router.post("/users", UserController.createUser);
Router.post("/login", UserController.loginUser);
Router.get("/:id", UserController.findByID);
Router.get("/email/:email", UserController.findByEmail);
Router.put("/update-password", UserController.updatePassword);
export const userRoutes = Router;
