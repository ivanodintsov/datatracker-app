import chatMemberStatistics from './chatMemberStatistics';
import chatMemberHourlyStatistics from './queryChatMemberHourlyStatistics';
import chatMember from './queryChatMember';

export const resolver = {
  Query: {
    chatMember,
    chatMemberStatistics,
    chatMemberHourlyStatistics
  }
};
