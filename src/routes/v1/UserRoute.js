import express from "express";
import UserController from "~/controllers/UserController";
import { UserValidation } from "~/validations/UsersValidation";

const Router = express.Router();

Router.post("/users", UserController.createUser);
Router.post("/login", UserController.loginUser);

export const userRoutes = Router;
