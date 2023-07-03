import { NextFunction, Request, Response } from 'express';
import productSchema from './joiSchema';

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  const { name, price } = req.body;
  const { error } = productSchema.validate({ name, price });
  if (!error) {
    return next();
  }
  if (error.details[0].type === 'string.min') {
    return res.status(422).json({ message: error.message });
  }
  if (error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.message });
  }
  if (error.details[0].type === 'string.base') {
    return res.status(422).json({ message: error.message });
  }
  next();
};

export default productValidation;