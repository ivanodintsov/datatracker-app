import mongoose from 'mongoose';
import { createUserSchema } from './User';

const UserSchema = createUserSchema({}, { _id: false });
export const MessageEntitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  offset: { type: Number, required: true },
  length: { type: Number, required: true },
  url: { type: String },
  user: { type: UserSchema }
});
