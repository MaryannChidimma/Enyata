import CustomerModel from '../models/customer.model'
import { BadRequestError } from '../../lib/appError';


class CartServices {

    async addToCart(productId: string, userId: string) {

        const customer = await CustomerModel.findById(userId);
        return await customer?.addToCart(productId);

    };

    async removeFromCart(productId: string, userId: string) {

        const customer = await CustomerModel.findById(userId);
        const removedFromCart = customer?.removeFromCart(productId);
        if (!removedFromCart) {
            throw new BadRequestError('could not remove Product from cart');
        }
        return removedFromCart
    };

     async getCart (userId: string){
        const customerCart = await CustomerModel.findById(userId)
        .populate({ path: 'cart.product', model: 'PRODUCT' });

        return customerCart
    
    };

     async clearCart (userId: string){
        const customer= await CustomerModel.findById(userId)
        return customer?.clearCart()
    }

};

export default new  CartServices()
