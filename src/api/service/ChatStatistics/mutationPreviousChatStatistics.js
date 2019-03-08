import R from 'ramda';
import { baseStatisticsKeys, baseStatisticsDefault } from '../../../models/Statistics/base';
import { divideObject, sumObjByKey } from '../../../helpers/object';
import { Chat, ChatDailyStatistics } from '../../../models';
import { concatPropName } from '../../../helpers/object';
import async from 'async';
import asyncPromisified from '../../../helpers/async';
import percentageChangeObj from '../../../helpers/percentageChange';
import { yesterdayDate } from '../../../helpers/moment';
import subtractChangeObj from '../../../helpers/subtractChange';

const calculateHoursAvg = R.pipe(
  R.values,
  R.reduce(
    (acc, el) => R.reduce(sumObjByKey(el), acc, baseStatisticsKeys),
    baseStatisticsDefault
  ),
  divideObject(R.__, baseStatisticsKeys)
);

const createProjectionFromArray = R.reduceRight(R.assoc(R.__, 1), {});
const percentageChangeKeys = [...baseStatisticsKeys, 'members_count'];
const createYesterdayProjection = createProjectionFromArray([...percentageChangeKeys, 'hours', 'chat', 'date']);
const incrementYesterday = async (chatDailyDocument) => {
  const yesterdayDayStatistics = R.pipe(
    R.pick(baseStatisticsKeys),
    concatPropName('avg_statistics_yesterday.')
  )(chatDailyDocument);

  await Chat.updateOne(
    { id: chatDailyDocument.chat },
    {
      $inc: {
        active_days: 1,
        ...yesterdayDayStatistics,
      },
    }
  );
};

const createPreviousStatisticsSingle = async todayDocument => {
  const hours = R.path([ 'hours' ], todayDocument);
  const yesterday = yesterdayDate(todayDocument.date);
  const yesterdayDocument = await ChatDailyStatistics.findOne(
    { chat: todayDocument.chat, date: yesterday },
    createYesterdayProjection,
    { lean: true }
  ).exec();
  const avgStatistics = calculateHoursAvg(hours);
  
  const update = {
    $set: {
      day_avg: avgStatistics,
      is_processed: true,
    }
  };

  if (yesterdayDocument) {
    update.$set.percentage_change = percentageChangeObj(percentageChangeKeys, [yesterdayDocument, todayDocument]);
    update.$set.subtract_change = subtractChangeObj(percentageChangeKeys, [yesterdayDocument, todayDocument]);
  }

  await ChatDailyStatistics.updateOne({ chat: todayDocument.chat, date: todayDocument.date, }, update);
  await incrementYesterday(todayDocument);
};
const createPreviousStatistics = async (_, { id: chatId, date }) => {
  try {
    const yesterday = yesterdayDate(date);

    const chatDailyYesterdayList = await ChatDailyStatistics.find(
      { chat: chatId, date: { $lte: yesterday }, is_processed: false },
      createYesterdayProjection,
      { lean: true },
    )
    .exec();

    await asyncPromisified.eachLimit(
      chatDailyYesterdayList, 1,
      async.asyncify(createPreviousStatisticsSingle)
    );
  } catch (err) {
    console.log(err);
    return;
  }
};

export default createPreviousStatistics;
