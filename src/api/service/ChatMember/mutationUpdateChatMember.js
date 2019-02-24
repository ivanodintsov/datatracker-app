import { ChatMember } from '../../../models';

const updateChatMember = async (_, { chat, user, input }) => {
  return await ChatMember.findOneAndUpdate({ chat, user }, input, { new: true });
};

export default updateChatMember;
