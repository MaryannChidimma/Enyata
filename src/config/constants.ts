import dotenv from 'dotenv';
dotenv.config();

const constants = {
  APP_NAME: "enyata", 
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_Customer_LOGIN_EXPIRATION: "2h",
  
  DB_COLLECTION :{
    CUSTOMER: "CUSTOMER",
    ADMIN: "ADMIN",
    PRODUCT: "PRODUCT",
    ORDER: "ORDER"
  },

  MESSAGES: {
    Customer_EXIST: "Customer already exists",
    Customer_CREATED: "Customer created successfully",
    Customer_LOGGED: "Customer logged in successfully",
    Customer_UPDATED: "Customer updated successfully",
    Customer_NOT_EXIST: "Customer does not exist",
    Product_NOT_FOUND: "Product with this Id was not Found",
    ALREADY_EXIST: "Resource already exists",
    CREATED: "Resource created successfully",
    FETCHED: "Resource fetched",
    UPDATED: "Resource updated successfully",
    DELETED: "Resource deleted successfully",
    NOT_FOUND: "Not found",
    INVALID_CREDENTIALS: "Invalid credentials",
  },
}

export default constants;
