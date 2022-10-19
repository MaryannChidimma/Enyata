import express from "express";
import customerRoute from "./customer.route";
import productRoute from "./product.route";
import orderRoute from "./order.route";
import cartRoute from "./cart.route";

const router = express.Router();

function rootRouter() {
  router.use('/customer', customerRoute())
  router.use('/product', productRoute())
  router.use('/cart', cartRoute())
  router.use('/order', orderRoute())
  return router;
}

export default rootRouter;
