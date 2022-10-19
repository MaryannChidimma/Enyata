import { Schema, model, Model } from "mongoose";
import constants from "../config/constants";
import { ICustomer} from "../utils/Interfaces/CustomerInterfaces";
import {Item} from "../utils/Interfaces/OrderInterfaces"
import { Product } from "../utils/Interfaces/ProductInterfaces";

const CustomerSchema = new Schema<ICustomer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true
    },
    cart: {
      items: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'PRODUCT',
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

CustomerSchema.methods.addToCart = function (product:string) {
  const cartProductIndex = this.cart.items.findIndex((index:Item) => {
    return index.product?.toString() === product
  });
  
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      product,
      quantity: newQuantity,
    });
  }

  this.cart.items = updatedCartItems

  return this.save();
};

CustomerSchema.methods.removeFromCart = function (product: string) {
 console.log(product)
  const updatedCartItems = this.cart.items.filter((item: Item) => {
    return item.product?.toString() != product?.toString()
  });
  console.log(updatedCartItems)

  this.cart.items = updatedCartItems;
  return this.save();
};

CustomerSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};


const CustomerModel: Model<ICustomer> = model(constants.DB_COLLECTION.CUSTOMER, CustomerSchema);

export default CustomerModel;
