import { ChatMember } from '../../../models';

const newChatMember = async (_, { input }) => {
  const chatMember = await ChatMember.findOne({ chat: input.chat, user: input.user });
  
  if (chatMember) {
    return null;
  }

  const newChatMember = await ChatMember.create(input);

  return newChatMember;
};

export default newChatMember;
