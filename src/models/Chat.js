import R from 'ramda';
import mongoose from 'mongoose';
import createMessageSchema from './Message/base';
import { baseStatistics } from './Statistics/base';
import reduceNumber from '../helpers/reduceNumber';
const Types = mongoose.Schema.Types;

const MessageSchema = createMessageSchema();
const StatisticsSchema = baseStatistics({}, { _id: false });

export const ChatSchema = new mongoose.Schema(
  {
    id: { type: Types.Long, required: true, unique: true },
    type: { type: String, required: true },
    title: { type: String },
    username: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    all_members_are_administrators: { type: Boolean },
    photo: {
      small_file_id: String,
      big_file_id: String,
      small_file: String,
      big_file: String
    },
    description: { type: String },
    invite_link: { type: String },
    pinned_message: { type: MessageSchema },
    sticker_set_name: { type: String },
    can_set_sticker_set: { type: Boolean },
    members_count: { type: Number },
    time_zone: { type: String },
    cron_updated_at: { type: Date, default: Date.now },
    statistics: { type: StatisticsSchema, default: StatisticsSchema },
    is_active: { type: Boolean, default: true },
    active_days: { type: Types.Long, default: 0 },
    avg_statistics_yesterday: { type: StatisticsSchema, default: StatisticsSchema },
  },
  {
    timestamps: true
  }
);

const reduceNumberVirtual = ({ name, field }) => {
  ChatSchema.virtual(name).get(function () {
    return reduceNumber(R.pathOr(0, field, this));
  });
};

const reduceNumberStatistics = [
  {
    name: 'members_countK',
    field: [ 'members_count' ]
  },
  {
    name: 'statisticsK.total',
    field: [ 'statistics', 'total' ]
  },
  {
    name: 'statisticsK.text',
    field: [ 'statistics', 'text' ]
  }
];
reduceNumberStatistics.forEach(reduceNumberVirtual);

ChatSchema.index({ type: 1 });
ChatSchema.index({ username: 1 });

const Chat = mongoose.model('chat', ChatSchema);

export default Chat;
