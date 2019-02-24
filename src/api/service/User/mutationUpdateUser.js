import { User } from '../../../models';

const updateUser = async (_, { id, input }) => {
  return await User.findOneAndUpdate({ id }, input, { new: true });
};

export default updateUser;
