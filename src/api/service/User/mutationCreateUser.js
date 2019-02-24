import { User } from '../../../models';

export const createUser = async (_, { input }) => {
  const user = await User.findOne({ id: input.id });
  
  if (user) {
    return null;
  }

  return await User.create(input);
};

export default createUser;
