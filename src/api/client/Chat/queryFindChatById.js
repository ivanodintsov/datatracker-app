import R from 'ramda';
import { Chat } from '../../../models';
import { ChatNotFound } from './errors';

const findChatById = async (_, { id }) => {
  const chat = await Chat.findOne({ id });

  if (R.isNil(chat)) {
    throw new ChatNotFound();
  }

  return chat;
};

export default findChatById;
