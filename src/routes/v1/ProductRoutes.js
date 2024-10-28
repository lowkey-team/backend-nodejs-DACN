import express from 'express';
import ProductController from '~/controllers/ProductController';
import { ProductValidation } from '~/validations/ProductValidation';

const Router = express.Router();

Router.route('/')
    .get(ProductController.getAllProducts)  
    .post(ProductValidation.createProduct, ProductController.createProduct); 

Router.route('/:id')
    .get(ProductController.findProductById) 
    .put(ProductValidation.updateProduct, ProductController.updateProduct) 
    .delete(ProductController.deleteProduct);  

export const productRoutes = Router;
