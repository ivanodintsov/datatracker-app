import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';
import { ChatStats } from '../../../models';

const ChatHourlyStatistics = async (_, { chat, range, timeZone }) => {
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const stats = await ChatStats.activeHours({ chat, timeZone, range: dates });
  return stats;
};

export default ChatHourlyStatistics;
