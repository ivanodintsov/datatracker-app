import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';
import { MessageEntitySchema } from './MessageEntity';
import { AnimationSchema } from './Animation';

export const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: [PhotoSizeScheme], required: true },
  text: { type: String },
  text_entities: { type: [MessageEntitySchema] },
  animation: { type: AnimationSchema }
}, { _id: false });
