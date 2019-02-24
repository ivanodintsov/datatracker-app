import { Chat } from '../../../models';

const chatStatistics = async (_, { id }) => {
  const chat = await Chat.findOne({ id });

  if (chat) {
    return chat.statistics;
  }
};

export default chatStatistics;
