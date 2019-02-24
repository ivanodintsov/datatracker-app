import { Chat } from '../../../models';

const leftUser = async (_, { id }) => {
  return await Chat.findOneAndUpdate({ id }, { $inc: { members_count: -1 } }, { new: true });
};

export default leftUser;
