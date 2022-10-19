import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import cartController from '../controllers/cart.controller';

const router = express.Router();

function cartRoute(){
router.post('/:productId',  authenticate, cartController.addToCart);
router.get('/', authenticate,  cartController.getCart);
router.patch('/:productId', authenticate, cartController.removeFromCart)
router.delete('/', authenticate, cartController.clearCart)
return router
}

export default cartRoute;
