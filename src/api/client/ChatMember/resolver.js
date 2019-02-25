import chatMemberStatistics from './chatMemberStatistics';
import chatMemberHourlyStatistics from './queryChatMemberHourlyStatistics';

export const resolver = {
  Query: {
    chatMemberStatistics,
    chatMemberHourlyStatistics
  }
};
