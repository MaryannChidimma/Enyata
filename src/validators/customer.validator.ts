import Joi from 'joi'

const RegisterSchema = Joi.object({
    fullName: Joi.string().min(3).required(),
    email: Joi.string().lowercase().email().required(),
    password: Joi.string().min(6).required(),
})

const LoginSchema = Joi.object({
    email: Joi.string().lowercase().email().required(),
    password: Joi.string().min(6),
})

export {
    RegisterSchema,
    LoginSchema
}