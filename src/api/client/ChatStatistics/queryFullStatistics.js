import { ChatMembersStats } from '../../../models';
import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';
import getChatStatistics from './queryChatStatistics';

const FullStatistics = async ({ chat, dates, timeZone }) => {
  const [
    chatStatistics,
    usersStatistics,
    usersActivityStatistics,
    hourlyStatistics,
    weekDaysStatistics
  ] = await Promise.all([
    getChatStatistics(null, { chat, range: dates, timeZone }),
    ChatMembersStats.usersStatistics(chat, dates, timeZone),
    ChatMembersStats.usersActivity(chat, dates, timeZone),
    ChatMembersStats.activeHours(chat, dates, timeZone),
    ChatMembersStats.activeWeekDays(chat, dates, timeZone)
  ]);

  return {
    chatStatistics,
    usersStatistics,
    usersActivityStatistics,
    hourlyStatistics,
    weekDaysStatistics
  };
};

const cachedFullStatistics = async (_, input) => {
  const { range, timeZone } = input;
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const response = await FullStatistics({ dates, ...input });

  return response;
};

export default cachedFullStatistics;
