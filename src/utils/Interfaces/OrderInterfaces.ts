import { Schema } from "mongoose"
import { SearchQuery } from "./UtilInterfaces";

interface IOrder {
 items:  any;
 total: number;
 customer: Schema.Types.ObjectId;
}

interface SearchOrder {
  product?: Schema.Types.ObjectId;
  quantity?:number;
  price?:number;

}
interface Item{
  product: Schema.Types.ObjectId;
  quantity: number;
  price:number;
}

interface QueryOrder extends SearchQuery{
  customer?: string;
  price?:number
}

export {
    IOrder,
    SearchOrder,
    QueryOrder,
    Item
}