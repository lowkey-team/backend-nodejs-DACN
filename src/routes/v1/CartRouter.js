import express from "express";
import CartController from "~/controllers/CartController";

const Router = express.Router();

Router.post("/cart", CartController.addProductToCart);
Router.get("/cart/:userId", CartController.getCartByUserId);
Router.get(
  "/GetTotalCart/:userId",
  CartController.GetTotalProductVariationsByUser
);
Router.delete("/cart/:cartId", CartController.deleteCartById);
Router.delete("/cart", CartController.deleteMultipleCartsById);
Router.put("/update", CartController.updateProductQuantity);

export const CartRoutes = Router;
