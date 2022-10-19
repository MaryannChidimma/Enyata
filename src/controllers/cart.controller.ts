import { Request, Response } from "express";
import { BadRequestError } from "../../lib/appError";
import { AuthRequest } from "../utils/Interfaces/UtilInterfaces";
import cartService from "../services/cart.service";
import productService from "../services/product.service";
import appResponse from "../../lib/appResponse"
import constants from "../config/constants";
const { MESSAGES } = constants

class CartController {
    addToCart = async (req: AuthRequest, res: Response) => {
        const { productId } = req.params;
        const { customer } = req;
        const product = await productService.findProduct({ _id: productId });
        if (!product)
            throw new BadRequestError('product does not exist');

        const cart = await cartService.addToCart(productId, customer!._id)
        res.status(200).send(appResponse(MESSAGES.CREATED, cart.cart));
    }

    removeFromCart = async (req: AuthRequest, res: Response) => {
        const { productId } = req.params;
        const { customer } = req;
        const cart = await cartService.removeFromCart(productId, customer!._id)
        
        res.status(200).send(appResponse(MESSAGES.DELETED, cart.cart));
    };

    getCart = async (req: AuthRequest, res: Response) => {
        const { customer } = req;  
        const cart = await cartService.getCart(customer!._id);

        res.status(200).send(appResponse(MESSAGES.FETCHED, cart?.cart));
    };
    clearCart = async (req: AuthRequest, res: Response) => {
        const { customer } = req;
        const cart = await cartService.clearCart(customer!._id);
        res.status(200).send(appResponse(MESSAGES.DELETED, cart));
    }
}

export default new CartController()