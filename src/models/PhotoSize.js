import mongoose from 'mongoose';

export const PhotoSizeScheme = new mongoose.Schema({
  file_id: { type: String, required: true },
  width: { type: Number },
  height: { type: Number },
  file_path: { type: String },
  file_size: { type: Number },
  local_path: { type: String }
}, { _id: false });
