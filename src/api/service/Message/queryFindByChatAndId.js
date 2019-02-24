import { Message } from '../../../models';

const findByChatAndId = async (_, { chat, message_id }) => {
  return await Message.findOne({ chat, message_id });
};

export default findByChatAndId;
