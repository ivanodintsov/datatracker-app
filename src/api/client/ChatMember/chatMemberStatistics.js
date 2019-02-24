import { ChatMember } from '../../../models';

const chatMemberStatistics = async (_, { chat, user }) => {
  const member = await ChatMember.findOne({ chat, user });

  if (member) {
    return member.statistics;
  }
};

export default chatMemberStatistics;
