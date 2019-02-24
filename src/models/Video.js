import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

export const VideoSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  duration: { type: Number, required: true},
  thumb: { type: PhotoSizeScheme },
  mime_type: { type: String },
  file_size: { type: Number }
}, { _id: false });
