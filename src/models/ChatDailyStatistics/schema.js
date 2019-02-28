import base from '../Statistics/base';

export const ChatDailyStatisticsSchema = base();
ChatDailyStatisticsSchema.index({ chat: 1, date: -1 }, { unique: true });
