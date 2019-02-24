import { Chat } from '../../../models';

const findChatById = async (_, { id }) => {
  return await Chat.findOne({ id });
};

export default findChatById;
