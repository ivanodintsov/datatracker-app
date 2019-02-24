import base from './base';
import aggregateChatStatistic from './aggregateChatStatistic';

export const ChatDailySchema = base();
ChatDailySchema.index({ chat: 1, date: 1 }, { unique: true });

ChatDailySchema.statics.chatStatistics = function(chat) {
  return range => this.aggregate(aggregateChatStatistic(chat, range)).allowDiskUse(true);
};
