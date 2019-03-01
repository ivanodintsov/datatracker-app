import R from 'ramda';
import moment from 'moment-timezone';
import { ChatMembersStats, Chat, StickerSet, ChatMember, ChatDailyStatistics } from '../../../models';
import logError from '../../../helpers/logError';
import { baseStatisticsKeys, baseStatisticsDefault } from '../../../models/Statistics/base';
import { divideObject, sumObjByKey } from '../../../helpers/object';

const concatPropName = (str, obj) => R.pipe(
  R.toPairs,
  R.map(R.over(R.lensIndex(0), R.concat(str))),
  R.fromPairs
)(obj);

const updateStickerSetsStats = async ({
  from,
  sticker_data
}) => {
  if (!sticker_data) {
    return;
  }

  const { name } = sticker_data;
  await StickerSet.updateOne(
    { name },
    {
      $addToSet: { users: from },
      $inc: { 'statistics.used': 1 }
    }
  );
};

const updateChatMembersStats = async ({
  from,
  chat,
  date,
  querterDate,
  startDate,
  ...data
}) => {

  const stats = await ChatMembersStats.findOne({
    from,
    chat,
    date: querterDate.toDate()
  });

  if (stats) {
    await ChatMembersStats.updateOne({
      from,
      chat,
      date: querterDate.toDate()
    },
    {
      $inc: data
    });
  } else {
    await ChatMembersStats.create([{
      from,
      chat,
      date: querterDate.toDate(),
      date_day: startDate,
      last_message_date: moment(date).toDate(),
      ...data
    }]);
  }
};

const getQuarterMinutes = minutes => 15 * Math.floor((minutes * 4) / 60);
const calculateHoursAvg = R.pipe(
  R.values,
  R.reduce(
    (acc, el) => R.reduce(sumObjByKey(el), acc, baseStatisticsKeys),
    baseStatisticsDefault
  ),
  divideObject(R.__, baseStatisticsKeys)
);


const dailyFindAndUpdate = async ({
  chat, date, data
}) => await ChatDailyStatistics.findOneAndUpdate(
  { chat, date },
  { $inc: data },
  { upsert: true, setDefaultsOnInsert: true }
);

const createYesterdayStatistics = async ({ chat, date }) => {
  try {
    const yesterday = moment(date).subtract(1, 'days').toDate();
    const chatDailyYesterday = await ChatDailyStatistics.findOne(
      { chat, date: yesterday },
      { hours: 1 }
    );
    const hours = R.path([ 'hours' ], chatDailyYesterday);
  
    if (hours) {
      chatDailyYesterday.set('day_avg', calculateHoursAvg(hours));
      chatDailyYesterday.save();
    }
  } catch (err) {
    return;
  }
};

export const mutationDailyChatStatistics = async (_, { input: { sticker_data, ...input } }) => {
  const { chat, date, from, ...data } = input;

  try {
    const chatLifetime = concatPropName('statistics.', data);
    const querterDate = moment(date);
    const startDateMoment = moment(date).startOf('day');
    const startDate = startDateMoment.toDate();
    const querter = getQuarterMinutes(querterDate.minutes());
    querterDate.startOf('hour').minutes(querter);

    await Chat.updateOne({ id: chat }, { $inc: chatLifetime });
    await ChatMember.updateOne({ chat: chat, user: from }, { $inc: chatLifetime });
    await updateChatMembersStats({ ...input, querterDate, startDate });
    await updateStickerSetsStats({ chat, from, sticker_data });

    const hoursStats = concatPropName(`hours.${querterDate.hour()}.`, data);
    const chatDailyStatistics = await dailyFindAndUpdate({
      chat, date: startDate,
      data: { ...data, ...hoursStats }
    });
    
    if (R.isNil(chatDailyStatistics)) {
      createYesterdayStatistics({ chat, date: startDateMoment });
    }
  } catch (error) {
    logError(error, input);
  }
};

export default mutationDailyChatStatistics;
