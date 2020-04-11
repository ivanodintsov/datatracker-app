import R from 'ramda';
import base, { baseStatistics } from '../Statistics/base';
import { ReputationSchema } from '../common/Reputation/Schema';

const hoursSchema = baseStatistics({
  reputation: { type: ReputationSchema, default: ReputationSchema },
}, { _id: false });
const dayAvgSchema = baseStatistics({}, { _id: false });
const percentageChangeSchema = baseStatistics({
  members_count: { type: Number, default: 0 },
  reputation: { type: Number, default: 0 },
}, { _id: false });
const subtractChangeSchema = baseStatistics({
  members_count: { type: Number, default: 0 },
  reputation: { type: Number, default: 0 },
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
  reputation: { type: ReputationSchema, default: ReputationSchema },
});
ChatDailyStatisticsSchema.index({ chat: 1, date: 1 }, { unique: true });

ChatDailyStatisticsSchema.statics.changeReputation = async function (opts) {
  const { chat, date, hour, type } = opts;

  const reputationHourUpdate = ReputationSchema.statics.buildReputationChange({
    path: `hours.${hour}.reputation`,
    reputation: type,
  });

  const reputationUpdate = ReputationSchema.statics.buildReputationChange({
    path: 'reputation',
    reputation: type,
  });

  const update = R.mergeDeepRight(reputationHourUpdate, reputationUpdate);

  const member = this
    .where('chat', chat)
    .where('date', date)
    .updateOne(update);

  return member;
};
