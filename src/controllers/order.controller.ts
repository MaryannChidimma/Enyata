import { Request, Response } from 'express'
import orderService from '../services/order.service'
import appResponse from '../../lib/appResponse'
import constants from '../config/constants'
import productService from '../services/product.service'
import { BadRequestError, NotFoundError } from '../../lib/appError'
import { AuthRequest } from '../utils/Interfaces/UtilInterfaces'
import customerService from '../services/customer.service'
const {MESSAGES} = constants

class OrderController {

    async create(req: AuthRequest, res: Response){
      const {customer} = req
      let sum =0
      let items:any = []
      
      const customerDetails  = await customerService.findCustomerAndPopulate({_id: customer!._id})
      if(!customerDetails)throw new NotFoundError()

      const product = await productService.findProduct(req.body.product)
      if(!product)throw new NotFoundError(MESSAGES.Product_NOT_FOUND)
       
      const cartLength:number|any = customerDetails?.cart?.items.length

      if( cartLength === 0) throw new BadRequestError("Please Add Products to Cart")
  
      customerDetails?.cart?.items.forEach((item) => {
     
         sum += Number(item.product.price) * Number(item.quantity )
         items.push({ product: item.product?._id,  quantity: item.quantity , price: item.product.price });

      });
 
      const Order = await orderService.addOrder({ items, total:sum, customer:customer?._id})
      res.status(201).send(appResponse(MESSAGES.CREATED, Order))
    }

    async getOrders (req: Request, res: Response){
      
      const Order = await orderService.findOrder(req.query)
      res.status(201).send(appResponse(MESSAGES.FETCHED, Order))
    }
}

export default new OrderController()