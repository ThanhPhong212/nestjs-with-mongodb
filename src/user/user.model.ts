import { Schema, Document } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    name: { type: String, default: '' },
  },
  {
    timestamps: true,
    id: false,
  },
);

export { userSchema };

export interface User extends Document {
  username: string;
  phone: string;
  email: string;
  name: string;
}
