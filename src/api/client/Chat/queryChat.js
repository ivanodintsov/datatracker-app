import R from 'ramda';
import { Chat } from '../../../models';
import { ResourceError } from '../errors';

const getActiveDays = R.pipe(
  R.propOr(1, 'active_days'),
  R.or(R.__, 1),
);

const toFixed = num => +Number.parseFloat(num).toFixed(2);

const chat = async (_, { id }) => {
  const chat = await Chat.findOne({ id }, null, { lean: true }).exec();

  if (R.isNil(chat)) {
    throw new ResourceError();
  }

  const activeDays = getActiveDays(chat);
  const avgTotal = R.pathOr(0, ['avg_statistics_yesterday', 'total'], chat);

  chat.avg_hourly = {
    total: toFixed(avgTotal / activeDays / 24),
  };

  chat.avg_daily = {
    total: toFixed(avgTotal / activeDays),
  };

  return chat;
};

export default chat;
