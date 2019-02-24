import mongoose from 'mongoose';
import { PhotoSizeScheme } from './PhotoSize';

const Types = mongoose.Schema.Types;
const MaskPosition = new mongoose.Schema({
  point: {
    type: String,
    required: true
  },
  x_shift: {
    type: Types.Double,
    required: true
  },
  y_shift: {
    type: Types.Double,
    required: true
  },
  scale: {
    type: Types.Double,
    required: true
  }
}, { _id: false });

export const StickerSchema = new mongoose.Schema({
  file_id: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  thumb: {
    type: PhotoSizeScheme
  },
  emoji: {
    type: String
  },
  set_name: {
    type: String
  },
  mask_position: {
    type: MaskPosition
  },
  file_size: {
    type: Number
  },
  file: {
    type: String
  }
}, { _id: false });
