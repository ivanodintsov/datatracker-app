import { User } from '../../../models';

const createUsers = async (_, { input }) => {
  return await User.create(input);
};

export default createUsers;
