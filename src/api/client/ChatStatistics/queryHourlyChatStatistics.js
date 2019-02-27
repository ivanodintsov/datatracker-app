import moments from 'moment-timezone';
import * as R from 'ramda';
import { ChatMembersStats } from '../../../models';
import activeHours from '../../../models/ChatMembersStats/activeHours';
import { ResourceError } from '../errors';

const timeZone = 'UTC';
const chatHourlyStatistics = async (_, { chat }) => {
  const now = moments();
  const dates = { from: now.clone().subtract(7, 'days'), to: now };
  const stats = await ChatMembersStats.aggregate(activeHours(chat, dates, timeZone));

  if (R.isEmpty(stats)) {
    throw new ResourceError();
  }

  return {
    range: {
      from: dates.from.toDate(),
      to: dates.to.toDate(),
    },
    data: stats
  };
};

export default chatHourlyStatistics;
