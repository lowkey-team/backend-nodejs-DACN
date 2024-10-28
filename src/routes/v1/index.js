import express from "express";
import { userRoutes } from "./UserRoute";
import { productRoutes } from "./ProductRoutes";

const Router = express.Router()

Router.use('/user',userRoutes)
Router.use('/product',productRoutes)


export const APIs_V1 = Router