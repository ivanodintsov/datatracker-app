import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

export const VideoNoteSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  length: { type: Number, required: true },
  duration: { type: Number, required: true},
  thumb: { type: PhotoSizeScheme },
  file_size: { type: Number }
}, { _id: false });
