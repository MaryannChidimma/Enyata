import express from 'express';
import { authenticate } from '../middleware/auth.middleware';
import cartCtrl from '../controllers/cart.controller';

const router = express.Router();

function cartRoute(){
router.post('/:productId',  authenticate, cartCtrl.addToCart);
router.get('/', authenticate,  cartCtrl.getCart);
router.patch('/:productId', authenticate, cartCtrl.removeFromCart)
router.delete('/', authenticate, cartCtrl.clearCart)
return router
}

export default cartRoute;
