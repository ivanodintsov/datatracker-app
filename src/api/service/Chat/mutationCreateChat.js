import { Chat } from '../../../models';

const createChat = async (_, { input }) => {
  return await Chat.findOneAndUpdate(
    { id: input.id },
    { ...input, is_active: true },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export default createChat;
