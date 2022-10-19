import { Request, Response } from 'express'
import customerService from '../services/customer.service'
import appResponse from '../../lib/appResponse'
import constants from '../config/constants'
import logger from '../../lib/logger'
import _ from 'lodash';
import { passwordHash } from '../utils/dataCryto'
const {MESSAGES} = constants

class CustomerController {

    async register(req: Request, res: Response){

      req.body.password = await passwordHash(req.body.password)
      const customer = await customerService.addCustomer(req.body)
      
      logger.info("register endpoint")
      res.status(201).send(appResponse(MESSAGES.Customer_CREATED, _.omit(customer._doc, ['password'])))
      
    }

    async login(req: Request, res: Response) {
      
      const customer = await customerService.login(req.body)
    
      logger.info("login endpoint")
      res.status(201).send(appResponse(MESSAGES.Customer_LOGGED,
      { customer: _.omit(customer._doc, ['password']), token: customer.token}))
    }
}

export default new CustomerController()