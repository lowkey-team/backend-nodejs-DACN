import express from 'express';
import multer from 'multer';
import ProductController from '~/controllers/ProductController';
import { ProductValidation } from '~/validations/ProductValidation';

const Router = express.Router();
const upload = multer({ dest: 'uploads/' });

Router.route('/')
    .get(ProductController.getAllProducts)  
    .post(ProductValidation.createProduct, ProductController.createProduct); 

Router.route('/getAll')
    .get(ProductController.getAll);

Router.route('/:id')
    .get(ProductController.findProductById) 
    .put(ProductValidation.updateProduct, ProductController.updateProduct) 
    .delete(ProductController.deleteProduct);  

export const productRoutes = Router;
