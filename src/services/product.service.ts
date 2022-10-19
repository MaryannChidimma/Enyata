import { BadRequestError } from "../../lib/appError";
import { Product } from "../Interfaces/ProductInterfaces";
import ProductModel from "../models/product.model";
import constants from "../config/constants";

const { MESSAGES } = constants;

class ProductServices {
    async addProduct(ProductData: Product) {

        const existingProduct = await ProductModel.findOne({ name: ProductData.name });
        if (existingProduct) throw new BadRequestError("Product with this name already exist");

        return await ProductModel.create(ProductData);
    }
    async findProduct(query:{}) {
        
        const product = await ProductModel.findOne(query);
        return product
    }


}

export default new ProductServices()