import R from 'ramda';
import { Chat, ChatDailyStatistics } from '../../../models';
import { yesterdayDate } from '../../../helpers/moment';

const updateChat = async (_, { id, input }) => {
  await Chat.updateOne({ id }, input, { new: true, lean: true }).exec();

  let dailyUpdate = {};
  const membersCount = R.prop('members_count', input);

  if (membersCount) {
    dailyUpdate = R.assocPath(['$set', 'members_count'], membersCount, dailyUpdate);
  }

  if (!R.isEmpty(dailyUpdate)) {
    const yesterday = yesterdayDate();
    await ChatDailyStatistics.updateOne({ chat: id, date: yesterday }, dailyUpdate, { lean: true }).exec();
  }
};

export default updateChat;
