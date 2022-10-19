import express from 'express';
import { Validator } from '../validators'
import {
  RegisterSchema,
  LoginSchema
 } from '../validators/customer.validator';
import customerController from '../controllers/customer.controller';

const router = express.Router();

function customerRoute(){
router.post('/register', Validator(RegisterSchema, 'body'), customerController.register);
router.post('/login', Validator(LoginSchema, 'body'), customerController.login);
return router
}

export default customerRoute;
