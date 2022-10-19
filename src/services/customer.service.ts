import { BadRequestError, NotFoundError, UnAuthorizedError } from "../../lib/appError";
import {
    ACustomer,
    CustomerLogin,
} from "../Interfaces/CustomerInterfaces";
import CustomerModel from "../models/customer.model";
import constants from "../config/constants";
import { comparePassword, encryptData } from "../utility/dataCryto";
const { MESSAGES } = constants;

class CustomerServices {
    async addCustomer(CustomerData: ACustomer) {

        const existingCustomer = await CustomerModel.findOne({ email: CustomerData.email });

        if (existingCustomer) throw new BadRequestError(MESSAGES.Customer_EXIST);
        return await CustomerModel.create(CustomerData);
    }

    async login(loginDetails: CustomerLogin) {

        // Check if the Customer exists
        const existingCustomer = await CustomerModel.findOne({ email: loginDetails.email })
        if (!existingCustomer) throw new NotFoundError(MESSAGES.Customer_NOT_EXIST)

        const isPassword = comparePassword(loginDetails.password, existingCustomer.password)
        if (!isPassword) throw new UnAuthorizedError("Invalid Password")

        const token = encryptData({ _id: existingCustomer._id, email: existingCustomer.email })
     
        const customer = { ...existingCustomer, token }
        return customer

    }

    async findCustomer(query: {}) {

        // Check if the Customer exists
        const existingCustomer = await CustomerModel.findOne(query)
        return existingCustomer
    }

    async findCustomerAndPopulate(query: {}){
        const existingCustomer = await CustomerModel.findOne(query).populate('cart.items.product');
        return existingCustomer
    }
}

export default new CustomerServices()