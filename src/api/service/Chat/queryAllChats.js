import { Chat } from '../../../models';

const allChats = async () => {
  return await Chat.find();
};

export default allChats;
