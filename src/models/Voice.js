import mongoose from 'mongoose';

export const VoiceSchema = new mongoose.Schema({
  file_id: { type: String, required: true },
  duration: { type: Number, required: true},
  mime_type: { type: String },
  file_size: { type: Number }
});
