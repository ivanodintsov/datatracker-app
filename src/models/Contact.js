import mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema({
  phone_number: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String },
  user_id: { type: Number },
  vcard: { type: String }
}, { _id: false });
