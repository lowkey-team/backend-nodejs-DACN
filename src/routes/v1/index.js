import express from "express";
import { userRoutes } from "./UserRoute";
import { productRoutes } from "./ProductRoutes";
import { CategoryRouter } from "./categoryRouter";
import { UploadImageRoute } from "./imageRoutes";
import { imageRoutes } from "./imageRouters";
import { productVariationRoutes } from "./productVariationRoutes";
import { AuthRouter } from "./AuthRouter";
import { CartRoutes } from "./CartRouter";
import { InvoiceRoute } from "./InvoiceRouter";
import { paymentRoute } from "./paymentRoute";
import { VoucherRouter } from "./VoucherRouter";
import { feedbackRouter } from "./Feedbackrouter";
import { emailRouter } from "./EmailRouter";
import { ghnRouter } from "./ghnRoutes";
import { SupplierRouter } from "./SupplierRouter";
import { OrderSupplierRouters } from "./ordersupplierRouter";
import { DiscountRouter } from "./discountRouter";
import { VariationDiscountRouter } from "./variationDiscountRouter";

import { CustomerRoute } from "./CustomerRouter";
import { DashboardRoute } from "./DashboardRouter";
import { RolePermissionRouter } from "./RolePermissionRouter";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { RolesRoutes } from "./RolesRouter";

const Router = express.Router();

Router.use("/user", userRoutes);
Router.use("/product", productRoutes);
Router.use("/category", CategoryRouter);
Router.use("/img", UploadImageRoute);
Router.use("/image", imageRoutes);
Router.use("/variation", productVariationRoutes);
Router.use("/Auth", AuthRouter);
Router.use("/cart", CartRoutes);
Router.use("/invoices", InvoiceRoute);
Router.use("/", paymentRoute);
Router.use("/voucher", VoucherRouter);
Router.use("/feedback", feedbackRouter);
Router.use("/email", emailRouter);
Router.use("/ngh", ghnRouter);
Router.use("/supplier", SupplierRouter);
Router.use("/orderSupplier", OrderSupplierRouters);
Router.use("/discount", DiscountRouter);
Router.use("/VariationDiscountRouter", VariationDiscountRouter);

Router.use("/dashboard", DashboardRoute);
Router.use("/customer", CustomerRoute);
Router.use("/roles", RolePermissionRouter);
Router.use("/employees", EmployeeRoutes);
Router.use("/RoleSystem", RolesRoutes);

export const APIs_V1 = Router;
