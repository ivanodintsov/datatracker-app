import { Message } from '../../../models';

export const createMessage = async (_, { input }) => {
  return await Message.create(input);
};

export default createMessage;
