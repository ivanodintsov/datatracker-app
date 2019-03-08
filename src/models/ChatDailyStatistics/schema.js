import R from 'ramda';
import base, { baseStatistics } from '../Statistics/base';

const hoursSchema = baseStatistics({}, { _id: false });
const dayAvgSchema = baseStatistics({}, { _id: false });
const percentageChangeSchema = baseStatistics({
  members_count: { type: Number, default: 0 },
}, { _id: false });
const subtractChangeSchema = baseStatistics({
  members_count: { type: Number, default: 0 },
}, { _id: false });
export const ChatDailyStatisticsSchema = base({
  hours: {
    type: R.reduce(
      (acc, el) => R.assoc(el, { type: hoursSchema }, acc),
      {},
      R.times(R.identity, 24)
    ),
  },
  day_avg: { type: dayAvgSchema },
  is_processed: { type: Boolean, default: false },
  percentage_change: { type: percentageChangeSchema },
  members_count: { type: Number, default: 0 },
  subtract_change: { type: subtractChangeSchema },
});
ChatDailyStatisticsSchema.index({ chat: 1, date: 1 }, { unique: true });
