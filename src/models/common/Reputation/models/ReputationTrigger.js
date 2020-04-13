import mongoose from 'mongoose';
import { ReputationSchema } from '../Schema';

const TEXT_TYPE = 'text';

export const TRIGGER_TYPE = {
  [TEXT_TYPE]: TEXT_TYPE,
};

export const ReputationTrigger = new mongoose.Schema(
  {
    type: {
      type: Number,
      default: 0,
      required: true,
    },
    trigger: {
      type: String,
      required: true,
    },
    changer: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: false,
    _id: false,
  },
);

export default ReputationSchema;
