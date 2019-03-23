import R from 'ramda';
import { ChatMember, User, Chat } from '../../../models';
import { ResourceError } from '../errors';
import moment from 'moment-timezone';

const isOnline = (date, duration = 10) => {
  return moment().subtract(duration, 'minutes').isSameOrBefore(date, 'minutes');
};

const chatMember = async (_, { chat: chatId, user: userId }) => {
  const member = await ChatMember.findOne({ chat: chatId, user: userId });

  if (R.isNil(member)) {
    throw new ResourceError();
  }

  const [ chat, user ] = await Promise.all([
    Chat.findOne({ id: chatId }),
    User.findOne({ id: userId })
  ]);

  if (R.isNil(chat)) {
    throw new ResourceError();
  }

  if (R.isNil(user)) {
    throw new ResourceError();
  }

  return {
    ...member.toObject(),
    user,
    chat,
    online: member.last_activity_date && isOnline(member.last_activity_date),
  };
};

export default chatMember;
