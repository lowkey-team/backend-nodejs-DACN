import express from "express";
import orderSupplierController from "~/controllers/ordersupplierController";

const router = express.Router();

router.post("/create", orderSupplierController.createOrderSupplier);

export const OrderSupplierRouters = router;
