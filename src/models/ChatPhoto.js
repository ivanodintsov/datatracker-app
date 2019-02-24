import mongoose from 'mongoose';

export const ChatPhotoSchema = new mongoose.Schema({
  small_file_id: { type: String, required: true },
  big_file_id: { type: String, required: true },
  small_path: { type: String },
  big_path: { type: String }
});
