import mongoose from 'mongoose';

export const InvoiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_parameter: { type: String, required: true },
  currency: { type: String, required: true },
  total_amount: { type: Number, required: true }
}, { _id: false });
