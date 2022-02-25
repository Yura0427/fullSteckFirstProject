import config from 'config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validUser } from '../validators/joi.validators';
import { Response, Request, NextFunction } from "express";
import UserService from "../services/user.service";

export class UserController {
    constructor(private userService: UserService) { }

    async login(_: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = _.body;
            const user = await this.userService.findUser(email);
            if (!user) return res.status(404).json({ message: "User not found!" });
            const isPassValid = bcrypt.compareSync(password, user.password);
            if (!isPassValid) return res.status(404).json({ message: "Invalid password" });
            const jwtToken = jwt.sign({ email: user.email, id: user._id }, config.get("jwtSecret"), {
                expiresIn: config.get("jwtExpiration"),
            });
            return res.status(200).json({
                jwtToken,
                user: {
                    id: user._id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
            });
        } catch (err) {
            next(err);
        }
    }
    async register(_: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.createUser(_.body);
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    }
}

const todoController = new UserController(new UserService());
export default todoController;