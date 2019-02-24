import mongoose from 'mongoose';
import { LocationSchema } from './Location';

export const VenueSchema = new mongoose.Schema({
  location: { type: LocationSchema, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  foursquare_id: { type: String },
  foursquare_type: { type: String }
}, { _id: false });
