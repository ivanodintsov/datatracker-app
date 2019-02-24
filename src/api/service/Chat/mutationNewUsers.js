import { Chat } from '../../../models';

const newUsers = async (_, { id, members_count }) => {
  return await Chat.findOneAndUpdate({ id }, { $inc: { members_count } }, { new: true });
};

export default newUsers;
