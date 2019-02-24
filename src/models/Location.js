import mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema({
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true }
}, { _id: false });
