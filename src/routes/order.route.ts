import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { Validator } from '../validators'
import {
  GetOrderSchema
 } from '../validators/order.validator';
import orderController from '../controllers/order.controller';

const router = express.Router();

function orderRoute(){
router.post('/', authenticate, orderController.create);
router.get('/', Validator(GetOrderSchema, 'query'), orderController.getOrders);

return router
}

export default orderRoute;
