import R from 'ramda';
import moment from 'moment-timezone';
import { baseStatisticsKeys, baseStatisticsDefault } from '../../../models/Statistics/base';
import { divideObject, sumObjByKey } from '../../../helpers/object';
import { Chat, ChatDailyStatistics } from '../../../models';
import { concatPropName } from '../../../helpers/object';

const calculateHoursAvg = R.pipe(
  R.values,
  R.reduce(
    (acc, el) => R.reduce(sumObjByKey(el), acc, baseStatisticsKeys),
    baseStatisticsDefault
  ),
  divideObject(R.__, baseStatisticsKeys)
);

const createProjectionFromArray = R.reduceRight(R.assoc(R.__, 1), {});
const createYesterdayProjection = createProjectionFromArray([...baseStatisticsKeys, 'hours']);
const incrementYesterday = async (chatId, chatDailyDocument) => {
  const yestardayDayStatictics = R.pipe(
    R.pick(baseStatisticsKeys),
    concatPropName('avg_statistics_yesterday.')
  )(chatDailyDocument.toJSON());

  await Chat.updateOne({ id: chatId }, {
    $inc: {
      active_days: 1,
      ...yestardayDayStatictics,
    },
  });
};
const createPreviousStatistics = async (_, { id: chatId, date }) => {
  try {
    const yesterday = moment(date).startOf('day').subtract(1, 'days').toDate();
    const chatDailyYesterdayList = await ChatDailyStatistics.find(
      { chat: chatId, date: { $lte: yesterday }, is_processed: false },
      createYesterdayProjection
    );

    for (let i = 0; i < chatDailyYesterdayList.length; i++) {
      const chatDailyYesterday = chatDailyYesterdayList[i];
      const hours = R.path([ 'hours' ], chatDailyYesterday);
      const avgStatistics = calculateHoursAvg(hours);

      chatDailyYesterday.set('day_avg', avgStatistics);
      chatDailyYesterday.set('is_processed', true);

      await chatDailyYesterday.save();
      await incrementYesterday(chatId, chatDailyYesterday);
    }
  } catch (err) {
    console.log(err);
    return;
  }
};

export default createPreviousStatistics;
