import express from "express";
import DiscountController from "~/controllers/discountController";

const router = express.Router();

router
  .route("/")
  .post(DiscountController.createDiscount)
  .get(DiscountController.getAllDiscounts);

router
  .route("/:id")
  .get(DiscountController.getDiscountById)
  .put(DiscountController.updateDiscount)
  .delete(DiscountController.deleteDiscount);

export const DiscountRouter = router;
