import express from 'express';
import { Validator } from '../validators'
import {
  ProductSchema,
 } from '../validators/product.validator';
import productController from '../controllers/product.controller';

const router = express.Router();

function productRoute(){
router.post('/',  Validator(ProductSchema, 'body'), productController.create);
return router
}

export default productRoute;
