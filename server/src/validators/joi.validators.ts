import { IUser } from '../models/User';
import Joi from "joi";

export const validUser: Joi.ObjectSchema<IUser> = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(12).required(),
  avatar: Joi.string(),
});