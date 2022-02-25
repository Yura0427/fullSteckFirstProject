import { User } from './../models/User';
import { validUser } from './joi.validators';
import { Request, Response, NextFunction } from "express";

export const validateUser = async (_: Request, res: Response, next: NextFunction) => {
    try {
        await await validUser.validateAsync(_.body);
        next();
    }
    catch (err) {
        return res.status(400).json(err);
    }
};

export const userIsExists = async (_: Request, res: Response, next: NextFunction) => {
    const { email } = _.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
        return res.status(409).json({ message: "User already exists!" });
    } else {
        next();
    }
};
export const userNotExists = async (_: Request, res: Response, next: NextFunction) => {
    const { email } = _.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(409).json({ message: "User not found!" });
    } else {
        next();
    }
};