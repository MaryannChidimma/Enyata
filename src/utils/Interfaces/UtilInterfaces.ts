import {Request } from "express"
import { Document} from "mongoose";
import { ICustomer } from "./CustomerInterfaces";

interface AuthRequest extends Request {
  auth?: ICustomer & Document;
  customer?: ICustomer& Document;
}
interface SearchQuery {
  pageSize?: number;
  pageNo? : number;
}

export {
  AuthRequest,
  SearchQuery,

}