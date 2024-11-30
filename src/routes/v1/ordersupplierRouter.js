import express from "express";
import orderSupplierController from "~/controllers/ordersupplierController";

const router = express.Router();

router.post("/create", orderSupplierController.createOrderSupplier);
router.get("/getAll", orderSupplierController.getOrderSupplierAll);
router.get("/:id", orderSupplierController.findByIDOrderSupplier);
router.put("/updateStatus", orderSupplierController.updateOrderStatus);
router.put(
  "/updateOrderDetail",
  orderSupplierController.updateOrderSupplierDetail
);
router.put(
  "/UpdateTotal",
  orderSupplierController.UpdateTotalPriceOrderSupplier
);

export const OrderSupplierRouters = router;
