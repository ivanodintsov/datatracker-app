import mongoose from 'mongoose';
import chatStatistics from './chatStatistics';
import chatStatisticsRanges from './chatStatisticsRanges';
import usersStatistics from './usersStatistics';
import usersActivity from './usersActivity';
import activeHours from './activeHours';
import activeWeekDays from './activeWeekDays';
import { baseStatistics } from '../Statistics/base';

const Types = mongoose.Schema.Types;

const ChatMembersStats = baseStatistics({
  chat: { type: Types.Long, required: true },
  from: { type: Number, required: true },
  date: { type: Date, required: true },
  date_day: { type: Date, required: true },
  last_message_date: { type: Date, required: true }
}, {
  timestamps: true
});

ChatMembersStats.index({ chat: 1, from: 1, date: -1 }, { unique: true });

ChatMembersStats.statics.chatStatistics = function(chat, range, timeZone) {
  return this.aggregate(chatStatistics(chat, range, timeZone)).allowDiskUse(true);
};

ChatMembersStats.statics.chatStatisticsRanges = function(chat, matchRange) {
  return ranges => this.aggregate(chatStatisticsRanges(chat, matchRange, ranges)).allowDiskUse(true);
};

ChatMembersStats.statics.usersStatistics = function(chat, range, timeZone) {
  return this.aggregate(usersStatistics(chat, range, timeZone)).allowDiskUse(true);
};

ChatMembersStats.statics.usersActivity = function(chat, range, timeZone) {
  return this.aggregate(usersActivity(chat, range, timeZone)).allowDiskUse(true);
};

ChatMembersStats.statics.activeHours = function(chat, range, timeZone) {
  return this.aggregate(activeHours(chat, range, timeZone)).allowDiskUse(true);
};

ChatMembersStats.statics.activeWeekDays = function(chat, range, timeZone) {
  return this.aggregate(activeWeekDays(chat, range, timeZone)).allowDiskUse(true);
};

export default ChatMembersStats;
