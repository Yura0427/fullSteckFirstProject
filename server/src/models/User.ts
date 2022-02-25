import { Schema, model, Model, Types } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    avatar?: string;
    diskSpace?: number;
    usedSpace?: number;
    files?: Object;
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    diskSpace: { type: Number, default: 1024 ** 3 * 10, },
    usedSpace: { type: Number, default: 0, },
    avatar: { type: String },
    files: [{ type: Types.ObjectId, ref: 'File' }]
})

export const User: Model<IUser> = model('User', userSchema)