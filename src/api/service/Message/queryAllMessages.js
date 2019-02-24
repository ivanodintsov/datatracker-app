import { Message } from '../../../models';

const allMessages = async () => {
  return await Message.find();
};

export default allMessages;
