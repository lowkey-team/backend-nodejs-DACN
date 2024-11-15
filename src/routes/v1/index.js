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

export const APIs_V1 = Router;
