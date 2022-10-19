import {Request } from "express"
import { Document} from "mongoose";
import { ACustomer } from "./CustomerInterfaces";

interface AuthRequest extends Request {
  auth?: ACustomer & Document;
  customer?: ACustomer& Document;
}
interface SearchQuery {
  pageSize?: number;
  pageNo? : number;
}

export {
  AuthRequest,
  SearchQuery,

}