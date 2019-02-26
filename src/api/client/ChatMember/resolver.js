import chatMemberStatistics from './chatMemberStatistics';
import chatMemberHourlyStatistics from './queryChatMemberHourlyStatistics';
import queryChatMember from './queryChatMember';

export const resolver = {
  Query: {
    queryChatMember,
    chatMemberStatistics,
    chatMemberHourlyStatistics
  }
};
