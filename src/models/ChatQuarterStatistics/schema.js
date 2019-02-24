import base from '../Statistics/base';
import aggregateChatStatistic from './aggregateChatStatistics';
import aggregateHourlyChatStatistics from './aggregateHourlyChatStatistics';

export const ChatQuarterSchema = base();
ChatQuarterSchema.index({ chat: 1, date: 1 }, { unique: true });

ChatQuarterSchema.statics.chatStatistics = function(query) {
  return this.aggregate(aggregateChatStatistic(query)).allowDiskUse(true);
};

ChatQuarterSchema.statics.hourlyChatStatistics = function(query) {
  return this.aggregate(aggregateHourlyChatStatistics(query)).allowDiskUse(true);
};
