import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

export const AudioSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  duration: { type: Number, required: true},
  performer: { type: String },
  title: { type: String },
  mime_type: { type: String },
  file_size: { type: Number },
  thumb: { type: PhotoSizeScheme }
});
