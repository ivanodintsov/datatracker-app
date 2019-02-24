import { ChatMembersStats } from '../../../models';
import { getTimeZoneOffset, getDatesFromTo } from '../../../helpers';

const chatUsersActivity = async (_, { chat, range, timeZone }) => {
  const offset = getTimeZoneOffset(timeZone);
  const dates = getDatesFromTo(offset, range);
  const stats = await ChatMembersStats.usersActivity(chat, dates, timeZone);

  return stats;
};

export default chatUsersActivity;
