import express from "express";
import ProductVariationController from "~/controllers/ProductVariationController";
import { ProductVariationValidation } from "~/validations/ProductVariationValidation";

const Router = express.Router();

Router.route("/")
  .get(ProductVariationController.getAllVariations)
  .post(
    ProductVariationValidation.createVariation,
    ProductVariationController.createVariation
  );

Router.route("/:id")
  .get(ProductVariationController.findVariationById)
  .put(
    ProductVariationValidation.updateVariation,
    ProductVariationController.updateVariation
  )
  .delete(ProductVariationController.deleteVariation);

Router.route("/bulk").post(ProductVariationController.createMultiple);

export const productVariationRoutes = Router;
