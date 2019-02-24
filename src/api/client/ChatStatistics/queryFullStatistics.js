import { ChatMembersStats } from '../../../models';
import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';
import getChatStatistics from './queryChatStatistics';

const FullStatistics = async ({ chat, dates, range, timeZone }) => {
  const [
    chatStatistics,
    usersStatistics,
    usersActivityStatistics,
    hourlyStatistics,
    weekDaysStatistics
  ] = await Promise.all([
    getChatStatistics(null, { chat, range, timeZone }),
    ChatMembersStats.usersStatistics(chat, dates, timeZone),
    ChatMembersStats.usersActivity(chat, dates, timeZone),
    ChatMembersStats.activeHours({ chat, timeZone, range: dates }),
    ChatMembersStats.activeWeekDays({ chat, timeZone, range: dates })
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
