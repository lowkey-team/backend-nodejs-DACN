import express from "express";
import { userRoutes } from "./UserRoute";
import { productRoutes } from "./ProductRoutes";
import { CategoryRouter } from "./categoryRouter";

const Router = express.Router()

Router.use('/user',userRoutes)
Router.use('/product',productRoutes)
Router.use('/category',CategoryRouter)



export const APIs_V1 = Router