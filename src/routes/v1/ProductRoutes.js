import express from "express";
import multer from "multer";
import ProductController from "~/controllers/ProductController";
import { ProductValidation } from "~/validations/ProductValidation";

const Router = express.Router();
const upload = multer({ dest: "uploads/" });

Router.route("/")
  .get(ProductController.getAllProducts)
  .post(upload.array("images", 10), ProductController.createProduct);

Router.route("/getAll").get(ProductController.getAll);
Router.route("/getTop10").get(ProductController.getTop10NewestProducts);
Router.route("/getSortByCategory").get(
  ProductController.getAllProductsSortedByCategory
);

Router.route("/:id")
  .get(ProductController.findProductById)
  .put(
    upload.array("images", 10),
    ProductValidation.updateProduct,
    ProductController.updateProduct
  )
  .delete(ProductController.deleteProduct);

export const productRoutes = Router;
