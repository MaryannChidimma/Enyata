
import Joi from 'joi'

const  ProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required()
})

export {
   ProductSchema,
}