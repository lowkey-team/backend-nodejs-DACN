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
