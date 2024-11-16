import express from "express";
import VoucherController from "~/controllers/VoucherController";

const Router = express.Router();

Router.get("/", VoucherController.getAllVouchers);
Router.post("/", VoucherController.createVoucher);
Router.put("/:id", VoucherController.updateVoucher);
Router.delete("/:id", VoucherController.deleteVoucher);
Router.get("/:id", VoucherController.findVoucherById);
Router.get("/check/:voucherCode", VoucherController.checkVoucherCode);

export const VoucherRouter = Router;
