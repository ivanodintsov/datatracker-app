import R from 'ramda';
import moments from 'moment-timezone';
import { ChatMembersStats } from '../../../models';

const timeZone = 'UTC';
const queryChatMemberHourlyStatistics = async (_, { chat, user }) => {
  const now = moments();
  const dates = { from: now.clone().subtract(7, 'days'), to: now };
  const stats = await ChatMembersStats.memberActiveHours(chat, user, dates, timeZone);

  if (R.isEmpty(stats)) {
    throw new Error('Resource not found.');
  }

  return {
    range: {
      from: dates.from.toDate(),
      to: dates.to.toDate(),
    },
    data: stats
  };
};

export default queryChatMemberHourlyStatistics;
