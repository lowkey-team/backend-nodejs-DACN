import express from "express";
import SupplierController from "~/controllers/SupplierController";

const Router = express.Router();

// CRUD Routes for Supplier
Router.get("/", SupplierController.getAllSuppliers);
Router.get("/:id", SupplierController.getSupplierById);
Router.post("/", SupplierController.createSupplier);
Router.put("/:id", SupplierController.updateSupplier);
Router.delete("/:id", SupplierController.deleteSupplier);

export const SupplierRouter = Router;

// import express from "express";
// import SupplierController from "~/controllers/SupplierController";
// import { checkPermission } from "~/middlewares/authMiddleware";

// const Router = express.Router();

// // CRUD Routes for Supplier
// Router.get(
//   "/",
//   checkPermission("Quản lý nhà cung cấp - Xem danh sách nhà cung cấp Layout"),
//   SupplierController.getAllSuppliers
// );
// Router.get(
//   "/:id",
//   checkPermission("Quản lý nhà cung cấp - Xem chi tiết nhà cung cấp"),
//   SupplierController.getSupplierById
// );
// Router.post(
//   "/",
//   checkPermission("Quản lý nhà cung cấp - Thêm nhà cung cấp mới"),
//   SupplierController.createSupplier
// );
// Router.put(
//   "/:id",
//   checkPermission("Quản lý nhà cung cấp - Sửa thông tin nhà cung cấp"),
//   SupplierController.updateSupplier
// );
// Router.delete(
//   "/:id",
//   checkPermission("Quản lý nhà cung cấp - Xóa nhà cung cấp"),
//   SupplierController.deleteSupplier
// );

// export const SupplierRouter = Router;
