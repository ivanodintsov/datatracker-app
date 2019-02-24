import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';
import { ChatMembersStats } from '../../../models';

const userStatistics = async (_, { chat, range: range, timeZone }) => {
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const stats = await ChatMembersStats.chatStatisticsAll(chat, dates, timeZone);
  return stats;
};

export default userStatistics;
