import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

export const AnimationSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  duration: { type: Number, required: true },
  thumb: { type: PhotoSizeScheme },
  file_name: { type: String },
  mime_type: { type: String },
  file_size: { type: Number }
}, { _id: false });
