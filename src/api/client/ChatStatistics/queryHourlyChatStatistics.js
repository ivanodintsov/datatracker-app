import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';
import { ChatStats } from '../../../models';

const ChatHourlyStatistics = async (_, { chat, range, timeZone }) => {
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const stats = await ChatStats.activeHours(chat, dates, timeZone);
  return stats;
};

export default ChatHourlyStatistics;
