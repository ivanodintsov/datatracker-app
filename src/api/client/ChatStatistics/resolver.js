import chatStatistics from './queryChatStatistics';
import chatUsersActivity from './queryChatUsersActivity';
import chatHourlyStatistics from './queryHourlyChatStatistics';
import chatFullStatistics from './queryFullStatistics';

export const resolver = {
  Query: {
    chatStatistics,
    chatUsersActivity,
    chatHourlyStatistics,
    chatFullStatistics
  }
};
