import { ChatMember } from '../../../models';

const allMembers = async () => {
  return await ChatMember.find();
};

export default allMembers;
