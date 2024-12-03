// import express from "express";
// import CategoryController from "~/controllers/CategoryController";
// import { CategoryValidation } from "~/validations/CategoryValidation";

// const Router = express.Router();

// Router.get("/", CategoryController.getAllCategories);

// Router.post(
//   "/",
//   CategoryValidation.createCategory,
//   CategoryController.createCategory
// );

// Router.put(
//   "/:id",
//   CategoryValidation.updateCategory,
//   CategoryController.updateCategory
// );

// Router.delete("/:id", CategoryController.deleteCategory);

// Router.get("/:id", CategoryController.findCategoryById);

// // Routes for SubCategories (Danh mục con)
// Router.post("/addSubcategories", CategoryController.createSubCategory);

// Router.put("/subcategories/:id", CategoryController.updateSubCategory);

// Router.delete("/subcategories/:id", CategoryController.deleteSubCategory);

// Router.get(
//   "/:categoryId/subcategories/:id",
//   CategoryController.findSubCategoryById
// );

// Router.get(
//   "/:categoryId/subcategories",
//   CategoryController.getSubCategoriesByCategoryId
// );

// export const CategoryRouter = Router;

import express from "express";
import CategoryController from "~/controllers/CategoryController";
import { CategoryValidation } from "~/validations/CategoryValidation";
import { checkPermission } from "~/middlewares/authMiddleware";

const Router = express.Router();

Router.get("/", CategoryController.getAllCategories);

// Route tạo mới danh mục (phải có quyền 'CREATE_CATEGORY')
Router.post(
  "/",
  checkPermission("CREATE_CATEGORY"), // Kiểm tra quyền tạo mới danh mục
  CategoryValidation.createCategory,
  CategoryController.createCategory
);

// Route cập nhật danh mục (phải có quyền 'UPDATE_CATEGORY')
Router.put(
  "/:id",
  checkPermission("UPDATE_CATEGORY"), // Kiểm tra quyền cập nhật danh mục
  CategoryValidation.updateCategory,
  CategoryController.updateCategory
);

// Route xóa danh mục (phải có quyền 'DELETE_CATEGORY')
Router.delete(
  "/:id",
  checkPermission("DELETE_CATEGORY"),
  CategoryController.deleteCategory
);

// Route lấy danh mục theo ID (có thể chỉ cần quyền 'VIEW_CATEGORY')
Router.get("/:id", CategoryController.findCategoryById);

// Routes for SubCategories (Danh mục con)
// Route tạo mới danh mục con (phải có quyền 'CREATE_SUBCATEGORY')
Router.post(
  "/addSubcategories",
  checkPermission("CREATE_SUBCATEGORY"),
  CategoryController.createSubCategory
);

// Route cập nhật danh mục con (phải có quyền 'UPDATE_SUBCATEGORY')
Router.put(
  "/subcategories/:id",
  checkPermission("UPDATE_SUBCATEGORY"),
  CategoryController.updateSubCategory
);

// Route xóa danh mục con (phải có quyền 'DELETE_SUBCATEGORY')
Router.delete(
  "/subcategories/:id",
  checkPermission("DELETE_SUBCATEGORY"),
  CategoryController.deleteSubCategory
);

// Route lấy danh mục con theo ID (có thể chỉ cần quyền 'VIEW_SUBCATEGORY')
Router.get(
  "/:categoryId/subcategories/:id",
  CategoryController.findSubCategoryById
);

// Route lấy tất cả danh mục con của một danh mục (có thể chỉ cần quyền 'VIEW_SUBCATEGORY')
Router.get(
  "/:categoryId/subcategories",
  CategoryController.getSubCategoriesByCategoryId
);

export const CategoryRouter = Router;
