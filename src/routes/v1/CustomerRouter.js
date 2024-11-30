import express from "express";
import CustomerController from "~/controllers/CustomerController";
const Router = express.Router();

// CRUD Routes for Supplier
Router.get("/", CustomerController.getAllCustomers);
Router.get("/:id", CustomerController.getCustomerById);
Router.get("/order/:id", CustomerController.getTotalOderByCustomerId);
Router.get("/order/all/:id", CustomerController.getAllOderByCustomerId);


export const CustomerRoute = Router;