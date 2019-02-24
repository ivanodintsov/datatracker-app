import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

export const DocumentSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  thumb: { type: PhotoSizeScheme },
  file_name: { type: String },
  mime_type: { type: String },
  file_size: { type: Number }
});
