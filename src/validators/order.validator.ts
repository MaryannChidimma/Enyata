
import Joi from 'joi'

const  OrderSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.string().required(),
    price: Joi.number()
})

const  GetOrderSchema = Joi.object({
    customer: Joi.string(),
    price: Joi.number()
})



export {
    OrderSchema,
  GetOrderSchema
}