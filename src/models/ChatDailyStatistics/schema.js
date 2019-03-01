import R from 'ramda';
import base, { baseStatistics } from '../Statistics/base';

const hoursSchema = baseStatistics({}, { _id: false });
const dayAvgSchema = baseStatistics({}, { _id: false });
export const ChatDailyStatisticsSchema = base({
  hours: {
    type: R.reduce(
      (acc, el) => R.assoc(el, { type: hoursSchema }, acc),
      {},
      R.times(R.identity, 24)
    ),
  },
  day_avg: { type: dayAvgSchema },
});
ChatDailyStatisticsSchema.index({ chat: 1, date: -1 }, { unique: true });
