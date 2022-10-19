import { Response, NextFunction} from "express"
import { UnAuthorizedError } from "../../lib/appError";
import { decryptData } from "../utils/dataCryto";
import customerService from "../services/customer.service"
import { AuthRequest } from "../utils/Interfaces/UtilInterfaces";

const getToken = (req:AuthRequest) => req.headers["x-auth-token"];

const authenticate = async function (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    //Logic for authentication goes in here
    const token = getToken(req);
    if (!token) throw new UnAuthorizedError("No token");
    if (typeof token !== "string")
      throw new UnAuthorizedError("Supply with a token");
    try {
      const decoded = await decryptData(token);
      const customer = await customerService.findCustomer({_id: decoded._id })
      if (!customer) {
        throw new UnAuthorizedError("Customer is not authorized");
      }
  
      req.customer = customer;

      next();
    } catch (error: any) {
      const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
      if (errors.includes(error?.name)) {
        throw new UnAuthorizedError("Please authenticate");
      }
      next(error);
    }
  };

  export {
    authenticate
  }