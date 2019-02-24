import R from 'ramda';
import moment from 'moment-timezone';
import { ChatMembersStats, Chat, StickerSet, ChatMember } from '../../../models';
import logError from '../../../helpers/logError';

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

export const mutationDailyChatStatistics = async (_, { input: { sticker_data, ...input } }) => {
  const { chat, date, ...data } = input;

  try {
    const chatLifetime = concatPropName('statistics.', data);
    const querterDate = moment(date);
    const startDate = moment(date).startOf('day').toDate();
    const querter = getQuarterMinutes(querterDate.minutes());
    querterDate.startOf('hour').minutes(querter);

    await Chat.updateOne({ id: chat }, { $inc: chatLifetime });
    await ChatMember.updateOne({ chat: chat, user: input.from }, { $inc: chatLifetime });
    await updateChatMembersStats({ ...input, querterDate, startDate });
    await updateStickerSetsStats({ chat, from: input.from, sticker_data });
  } catch (error) {
    logError(error, input);
  }
};

export default mutationDailyChatStatistics;
