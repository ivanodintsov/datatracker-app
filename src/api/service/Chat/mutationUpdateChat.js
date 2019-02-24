import { Chat } from '../../../models';

const updateChat = async (_, { id, input }) => {
  return await Chat.findOneAndUpdate({ id }, input, { new: true });
};

export default updateChat;
