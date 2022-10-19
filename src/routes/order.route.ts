import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { Validator } from '../validators'
import {
  OrderSchema,
  GetOrderSchema
 } from '../validators/order.validator';
import orderCtrl from '../controllers/order.controller';

const router = express.Router();

function orderRoute(){
router.post('/', authenticate, orderCtrl.create);
router.get('/', Validator(GetOrderSchema, 'query'), orderCtrl.getOrders);

return router
}

export default orderRoute;
