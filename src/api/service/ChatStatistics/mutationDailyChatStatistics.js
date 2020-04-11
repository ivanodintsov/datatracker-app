import moment from 'moment-timezone';
import { ChatMembersStats, Chat, StickerSet, ChatMember } from '../../../models';
import logError from '../../../helpers/logError';
import { concatPropName } from '../../../helpers/object';
import dailyFindAndUpdate from './mutationCreateDailyStatistics';

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
  quarterDate,
  startDate,
  ...data
}) => {

  const stats = await ChatMembersStats.findOne({
    from,
    chat,
    date: quarterDate.toDate()
  });

  if (stats) {
    await ChatMembersStats.updateOne({
      from,
      chat,
      date: quarterDate.toDate()
    },
    {
      $inc: data
    });
  } else {
    await ChatMembersStats.create([{
      from,
      chat,
      date: quarterDate.toDate(),
      date_day: startDate,
      last_message_date: moment(date).toDate(),
      ...data
    }]);
  }
};

const getQuarterMinutes = minutes => 15 * Math.floor((minutes * 4) / 60);

export const mutationDailyChatStatistics = async (_, { input: { sticker_data, ...input }, edit_date }) => {
  const { chat, date, from, ...data } = input;

  try {
    const chatLifetime = concatPropName('statistics.', data);
    const quarterDate = moment(date);
    const startDateMoment = moment(date).startOf('day');
    const startDate = startDateMoment.toDate();
    const quarter = getQuarterMinutes(quarterDate.minutes());
    quarterDate.startOf('hour').minutes(quarter);

    await Chat.updateOne({ id: chat }, { $inc: chatLifetime });
    await ChatMember.updateOne(
      { chat: chat, user: from },
      {
        $inc: chatLifetime,
        $set: {
          last_message_date: date,
          last_activity_date: edit_date || date
        }
      },
    );
    await updateChatMembersStats({ ...input, quarterDate, startDate });
    await updateStickerSetsStats({ chat, from, sticker_data });

    const hoursStats = concatPropName(`hours.${quarterDate.hour()}.`, data);
    await dailyFindAndUpdate(null, {
      chat, date: startDate,
      data: { ...data, ...hoursStats }
    });
  } catch (error) {
    logError(error, input);
  }
};

export default mutationDailyChatStatistics;
