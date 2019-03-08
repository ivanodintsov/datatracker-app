import { chatStatistics4days } from './queryChatStatistics';
import chatUsersActivity from './queryChatUsersActivity';
import chatHourlyStatistics from './queryHourlyChatStatistics';
import chatFullStatistics from './queryFullStatistics';

export const resolver = {
  Query: {
    chatStatistics4days,
    chatUsersActivity,
    chatHourlyStatistics,
    chatFullStatistics
  }
};
