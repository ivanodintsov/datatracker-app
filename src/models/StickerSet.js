import mongoose from 'mongoose';
import { StickerSchema } from './Sticker';

const StickerSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  contains_masks: {
    type: Boolean
  },
  stickers: {
    type: [StickerSchema]
  },
  count: {
    type: Number,
    default: 0
  },
  users: {
    type: [Number],
    default: 0
  },
  statistics: {
    users_count: {
      type: Number,
      default: 0
    },
    used: {
      type: Number,
      default: 0
    }
  }
});

StickerSetSchema.index({ name: 1 }, { unique: true });
StickerSetSchema.index({ 'statistics.used': -1 });

const StickerSet = mongoose.model('sticker_set', StickerSetSchema);

export default StickerSet;
