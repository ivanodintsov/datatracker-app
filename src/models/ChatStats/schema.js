import mongoose from 'mongoose';
import activeHours from './activeHours';
import activeWeekDays from './activeWeekDays';
import chatStatisticsRanges from './chatStatisticsRanges';
import chatStatistics from './chatStatistics';
import { baseStatistics } from '../Statistics/base';
const Types = mongoose.Schema.Types;

const ChatStatsSchema = new mongoose.Schema(
  {
    meta: {
      date: { type: Date, required: true },
      chat: { type: Types.Long, required: true }
    },
    daily: baseStatistics({}, { _id: false }),
    quarter: [baseStatistics({ date: { type: Date, required: true } }, { _id: false })]
  },
  {
    timestamps: true
  }
);
ChatStatsSchema.index({ 'meta.chat': 1, 'meta.date': -1 }, { unique: true });
ChatStatsSchema.index({ 'meta.chat': 1 });

ChatStatsSchema.statics.activeHours = function(query) {
  return this.aggregate(activeHours(query)).allowDiskUse(true);
};

ChatStatsSchema.statics.activeWeekDays = function(query) {
  return this.aggregate(activeWeekDays(query)).allowDiskUse(true);
};

ChatStatsSchema.statics.chatStatisticsRanges = function(chat, matchRange) {
  return ranges => this.aggregate(chatStatisticsRanges(chat, matchRange, ranges)).allowDiskUse(true);
};

ChatStatsSchema.statics.chatStatistics = function(chat) {
  return ranges => this.aggregate(chatStatistics(chat, ranges)).allowDiskUse(true);
};

export default ChatStatsSchema;
