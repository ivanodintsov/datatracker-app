import { ChatMember } from '../../../models';
import moment from 'moment-timezone';

const notUpdatedChatMembers = async (_, { days, limit }) => {
  const date = moment().startOf('day').add(-days, 'days');

  return await ChatMember.find({
    updatedAt: { $lte: date }
  }).limit(limit);
};

export default notUpdatedChatMembers;
