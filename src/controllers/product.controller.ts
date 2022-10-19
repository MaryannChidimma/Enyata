import { Request, Response } from 'express'
import productService from '../services/product.service'
import appResponse from '../../lib/appResponse'
import constants from '../config/constants'
const {MESSAGES} = constants

class ProductController {

    async create(req: Request, res: Response){
      const Product = await productService.addProduct(req.body)
      res.status(201).send(appResponse("Product Created Successfully", Product))
    }
}

export default new ProductController()