import { ChatDailyStatistics } from '../../../models';

const dailyFindAndUpdate = async (_, {
  chat, date, data,
}) => {
  const update = {};

  if (data) {
    update.$inc = data;
  }

  await ChatDailyStatistics.findOneAndUpdate(
    { chat, date }, update,
    { upsert: true, setDefaultsOnInsert: true }
  );
};

export default dailyFindAndUpdate;
