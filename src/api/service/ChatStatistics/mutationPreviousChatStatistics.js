import R from 'ramda';
import moment from 'moment-timezone';
import { baseStatisticsKeys, baseStatisticsDefault } from '../../../models/Statistics/base';
import { divideObject, sumObjByKey } from '../../../helpers/object';
import { Chat, ChatDailyStatistics } from '../../../models';
import { concatPropName } from '../../../helpers/object';
import async from 'async';
import asyncPromisified from '../../../helpers/async';
import percentageChangeObj from '../../../helpers/percentageChange';

const calculateHoursAvg = R.pipe(
  R.values,
  R.reduce(
    (acc, el) => R.reduce(sumObjByKey(el), acc, baseStatisticsKeys),
    baseStatisticsDefault
  ),
  divideObject(R.__, baseStatisticsKeys)
);

const createProjectionFromArray = R.reduceRight(R.assoc(R.__, 1), {});
const createYesterdayProjection = createProjectionFromArray([...baseStatisticsKeys, 'hours', 'chat', 'date']);
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

const calculatePercentageChange = async (todayDocument) => {
  const yesterday = moment(todayDocument.date)
    .startOf('day')
    .subtract(1, 'days')
    .toDate();

  const yesterdayDocument = await ChatDailyStatistics.findOne(
    { chat: todayDocument.chat, date: yesterday },
    createYesterdayProjection,
    { lean: true }
  ).exec();

  if (!yesterdayDocument) {
    return;
  }

  return percentageChangeObj(baseStatisticsKeys, [yesterdayDocument, todayDocument]);
};

const createPreviousStatisticsSingle = async chatDailyYesterday => {
  const hours = R.path([ 'hours' ], chatDailyYesterday);
  const percentageChange = await calculatePercentageChange(chatDailyYesterday);
  const avgStatistics = calculateHoursAvg(hours);
  
  const update = {
    $set: {
      day_avg: avgStatistics,
      is_processed: true,
    }
  };

  if (percentageChange) {
    update.$set.percentage_change = percentageChange;
  }

  await ChatDailyStatistics.updateOne(
    {
      chat: chatDailyYesterday.chat,
      date: chatDailyYesterday.date,
    },
    update
  );

  await incrementYesterday(chatDailyYesterday);
};
const createPreviousStatistics = async (_, { id: chatId, date }) => {
  try {
    const yesterday = moment(date)
      .startOf('day')
      .subtract(1, 'days')
      .toDate();

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
