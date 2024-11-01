import express from "express";
import { userRoutes } from "./UserRoute";
import { productRoutes } from "./ProductRoutes";
import { CategoryRouter } from "./categoryRouter";
import { UploadImageRoute } from "./imageRoutes";

const Router = express.Router()

Router.use('/user',userRoutes)
Router.use('/product',productRoutes)
Router.use('/category',CategoryRouter)
Router.use('/img',UploadImageRoute)


export const APIs_V1 = Router