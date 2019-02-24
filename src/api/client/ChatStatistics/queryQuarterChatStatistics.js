import { ChatStats } from '../../../models';
import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';

const ChatQuarterStatistics = async (_, { chat, range, timeZone }) => {
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const stats = await ChatStats.activeWeekDays(chat, dates, timeZone);
  return stats;
};

export default ChatQuarterStatistics;
