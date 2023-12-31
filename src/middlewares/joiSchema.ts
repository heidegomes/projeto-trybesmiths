import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.string().min(3).required(),
});

export default productSchema;