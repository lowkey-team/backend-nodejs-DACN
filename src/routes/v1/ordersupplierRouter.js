import express from "express";
import orderSupplierController from "~/controllers/ordersupplierController";

const router = express.Router();

router.post("/create", orderSupplierController.createOrderSupplier);
router.get("/getAll", orderSupplierController.getOrderSupplierAll);

export const OrderSupplierRouters = router;
