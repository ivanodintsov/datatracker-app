import R from 'ramda';
import { ChatMember } from '../../../models';
import { ResourceError } from '../errors';

const chatMemberStatistics = async (_, { chat, user }) => {
  const member = await ChatMember.findOne({ chat, user });

  if (R.isNil(member)) {
    throw new ResourceError();
  }

  return {
    ...member.statistics.toJSON(),
    reputation: member.reputation,
  };
};

export default chatMemberStatistics;
