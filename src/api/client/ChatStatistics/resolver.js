import chatStatistics from './queryChatStatistics';
import chatUsersActivity from './queryChatUsersActivity';
import chatQuarterStatistics from './queryQuarterChatStatistics';
import chatHourlyStatistics from './queryHourlyChatStatistics';
import chatFullStatistics from './queryFullStatistics';

export const resolver = {
  Query: {
    chatStatistics,
    chatUsersActivity,
    chatQuarterStatistics,
    chatHourlyStatistics,
    chatFullStatistics
  }
};
