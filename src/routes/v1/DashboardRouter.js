import express from "express";
import DashboardController from "~/controllers/DashboardController";
const Router = express.Router();

Router.get("/product", DashboardController.countProductController);
Router.get("/order", DashboardController.getOrderTodayController);
Router.get("/customer", DashboardController.countNewCustomerController);
Router.get("/revenue", DashboardController.totalRevenueController);
Router.get("/monthlyrevenue", DashboardController.getMonthlyRevenueController);
Router.get("/product-variation-revenue", DashboardController.getRevenueByProductVariationController);


export const DashboardRoute = Router;