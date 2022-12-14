import { Schema } from "mongoose";

interface ICustomer {
    fullName: string;
    email: string;
    password: string;
    cart?: Items;
    addToCart? : any,
    removeFromCart? : any,
    clearCart? : any


    _doc?: any;
}
interface Items {
    items: [{product: Schema.Types.ObjectId | any, quantity: number}]
}
interface CustomerLogin {
    email: string;
    password: string;
}


export {
    ICustomer,
    CustomerLogin
}