const express = require('express');
import { authenticate } from '../middleware/auth.middleware';
import { Validator } from '../validators'
import {
  RegisterSchema,
  LoginSchema
 } from '../validators/customer.validator';
import customerCtrl from '../controllers/customer.controller';

const router = express.Router();

function customerRoute(){
router.post('/register', Validator(RegisterSchema, 'body'), customerCtrl.register);
router.post('/login', Validator(LoginSchema, 'body'), customerCtrl.login);
return router
}

export default customerRoute;
