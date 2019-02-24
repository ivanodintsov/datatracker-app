import { User } from '../../../models';

const allUsers = async () => {
  return await User.find();
};

export default allUsers;
