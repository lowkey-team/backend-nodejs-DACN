import express from "express";
import CategoryController from "~/controllers/CategoryController";
import { CategoryValidation } from "~/validations/CategoryValidation";

const Router = express.Router();

Router.get("/", CategoryController.getAllCategories);

Router.post("/",CategoryValidation.createCategory, CategoryController.createCategory);

Router.put("/:id",CategoryValidation.updateCategory,CategoryController.updateCategory);

Router.delete("/:id", CategoryController.deleteCategory);

Router.get("/:id", CategoryController.findCategoryById);


export const CategoryRouter = Router;
