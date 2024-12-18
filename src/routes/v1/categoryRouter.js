import express from "express";
import CategoryController from "~/controllers/CategoryController";
import { CategoryValidation } from "~/validations/CategoryValidation";

const Router = express.Router();

Router.get("/", CategoryController.getAllCategories);

Router.post(
  "/",
  CategoryValidation.createCategory,
  CategoryController.createCategory
);

Router.put(
  "/:id",
  CategoryValidation.updateCategory,
  CategoryController.updateCategory
);

Router.delete("/:id", CategoryController.deleteCategory);

Router.get("/:id", CategoryController.findCategoryById);

// Routes for SubCategories (Danh mục con)
Router.post("/addSubcategories", CategoryController.createSubCategory);

Router.put("/subcategories/:id", CategoryController.updateSubCategory);

Router.delete("/subcategories/:id", CategoryController.deleteSubCategory);

Router.get(
  "/:categoryId/subcategories/:id",
  CategoryController.findSubCategoryById
);

Router.get(
  "/:categoryId/subcategories",
  CategoryController.getSubCategoriesByCategoryId
);

export const CategoryRouter = Router;

// import express from "express";
// import CategoryController from "~/controllers/CategoryController";
// import { CategoryValidation } from "~/validations/CategoryValidation";
// import { checkPermission } from "~/middlewares/authMiddleware";

// const Router = express.Router();

// Router.get("/", CategoryController.getAllCategories);

// Router.post(
//   "/",
//   CategoryValidation.createCategory,
//   CategoryController.createCategory
// );

// Router.put(
//   "/:id",
//   checkPermission("UPDATE_CATEGORY"),
//   CategoryValidation.updateCategory,
//   CategoryController.updateCategory
// );

// Router.delete(
//   "/:id",
//   checkPermission("DELETE_CATEGORY"),
//   CategoryController.deleteCategory
// );

// Router.get("/:id", CategoryController.findCategoryById);

// Router.post(
//   "/addSubcategories",
//   checkPermission("CREATE_SUBCATEGORY"),
//   CategoryController.createSubCategory
// );

// Router.put(
//   "/subcategories/:id",
//   checkPermission("UPDATE_SUBCATEGORY"),
//   CategoryController.updateSubCategory
// );

// Router.delete(
//   "/subcategories/:id",
//   checkPermission("DELETE_SUBCATEGORY"),
//   CategoryController.deleteSubCategory
// );

// Router.get(
//   "/:categoryId/subcategories/:id",
//   CategoryController.findSubCategoryById
// );

// Router.get(
//   "/:categoryId/subcategories",
//   CategoryController.getSubCategoriesByCategoryId
// );

// export const CategoryRouter = Router;
