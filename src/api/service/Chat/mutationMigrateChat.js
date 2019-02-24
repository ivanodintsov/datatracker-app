import { Chat, ChatMembersStats } from '../../../models';

const migrateChat = async (_, { id, input }) => {
  const [ chat ] = await Promise.all([
    Chat.findOneAndUpdate({ id }, input, { new: true }),
    ChatMembersStats.updateMany({ chat: id }, { $set: { chat: input.id } })
  ]);

  return chat;
};

export default migrateChat;
