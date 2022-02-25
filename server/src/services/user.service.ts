import { IUser, User } from "../models/User";
import bcrypt from "bcryptjs";

export default class UserService {
  async findUser(email: string) {
    const user = await User.findOne({ email });
    return user;
  }
  async createUser(payload: IUser) {
    const {  password } = payload
    const hashPassword = await bcrypt.hash(password, 10)
    payload.password=hashPassword
    const user = await User.create(payload);
    return user;
  }
}
