import express from "express";
import VariationDiscountController from "~/controllers/variationDiscountController";

const router = express.Router();

router.post("/", VariationDiscountController.createVariationDiscount);
router.get("/", VariationDiscountController.getAllVariationDiscounts);
router.get("/:id", VariationDiscountController.getVariationDiscountById);
router.put("/:id", VariationDiscountController.updateVariationDiscount);
router.delete("/:id", VariationDiscountController.deleteVariationDiscount);

export const VariationDiscountRouter = router;
