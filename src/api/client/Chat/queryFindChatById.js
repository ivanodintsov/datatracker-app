import R from 'ramda';
import { Chat } from '../../../models';
import { ResourceError } from '../errors';

const findChatById = async (_, { id }) => {
  const chat = await Chat.findOne({ id });

  if (R.isNil(chat)) {
    throw new ResourceError();
  }

  return chat;
};

export default findChatById;
