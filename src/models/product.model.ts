
import { Schema, model, Model } from "mongoose";
import constants from "../config/constants";
import { Product } from "../Interfaces/ProductInterfaces";

const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
       required: true
    }
  },
  { timestamps: true }
);

const ProductModel: Model<Product> = model(constants.DB_COLLECTION.PRODUCT, ProductSchema);

export default ProductModel;
