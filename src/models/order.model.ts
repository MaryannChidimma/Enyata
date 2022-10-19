
import { Schema, model, Model } from "mongoose";
import constants from "../config/constants";
import { CreateOrder } from "../utils/Interfaces/OrderInterfaces";

const OrderSchema = new Schema<CreateOrder>(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: constants.DB_COLLECTION.PRODUCT,
          required: true,

        },
        quantity: {
            type: String,
            required: true,
        },

        price: {
          type: Number,
           required: true,
        }
        
      }
    ],
    total: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'CUSTOMER',
    }
  },

  { timestamps: true }
);

const OrderModel: Model<CreateOrder> = model(constants.DB_COLLECTION.ORDER, OrderSchema);

export default OrderModel;
