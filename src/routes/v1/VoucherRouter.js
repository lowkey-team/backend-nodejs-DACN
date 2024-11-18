import express from "express";
import VoucherController from "~/controllers/VoucherController";

const Router = express.Router();

Router.get("/getVoucherByUser/:id", VoucherController.getAllVouchers);
Router.get(
  "/GetVouchersSaveByUserID/:id",
  VoucherController.GetVouchersSaveByUserID
);
Router.post("/", VoucherController.createVoucher);
Router.post("/addVoucherToUser", VoucherController.addVoucherToUser);
Router.put("/:id", VoucherController.updateVoucher);
Router.delete("/:id", VoucherController.deleteVoucher);
Router.get("/:id", VoucherController.findVoucherById);
Router.get("/check/:voucherCode", VoucherController.checkVoucherCode);

export const VoucherRouter = Router;