import { CreateOrder, QueryOrder } from "../utils/Interfaces/OrderInterfaces";
import OrderModel from "../models/order.model";
import constants from "../config/constants";

const { MESSAGES } = constants;

class OrderServices {
    async addOrder(OrderData: CreateOrder) {
        
        return await OrderModel.create(OrderData);
    }
    async findOrder(query: QueryOrder) {

    const pageSize = Number(query.pageSize) || 5;
    const pageNo = Number(query.pageNo) || 1;

    const queryObject: QueryOrder = {};

    // If there is a query by customer
    if (query.customer) {
      queryObject.customer = query.customer;
    }

    const noToSkip = (pageNo - 1) * pageSize;
    let fetched:[] 

    // If there is a query by price
    if (query.price) {
      fetched =  await OrderModel
        .find(queryObject, { items : { $elemMatch: {price: Number(query.price) } } })
        .sort({ createdAt: 1 })
        .skip(noToSkip)
        .limit(pageSize)
        .lean();
     }

   else{
    fetched = await OrderModel
      .find(queryObject)
      .sort({ createdAt: 1 })
      .skip(noToSkip)
      .limit(pageSize)
      .lean();
   }
    const totalCount = await OrderModel.countDocuments(queryObject);

    const noOfPages = Math.ceil(totalCount / pageSize);

    return {
      fetchedData: fetched,
      noOfPages,
      totalCount,
      pageNo,
      pageSize,
    };
    }

}



export default new OrderServices()