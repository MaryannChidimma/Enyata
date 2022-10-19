import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { Validator } from '../validators'
import {
  ProductSchema,
 } from '../validators/product.validator';
import productCtrl from '../controllers/product.controller';

const router = express.Router();

function productRoute(){
router.post('/',  Validator(ProductSchema, 'body'), productCtrl.create);
return router
}

export default productRoute;
