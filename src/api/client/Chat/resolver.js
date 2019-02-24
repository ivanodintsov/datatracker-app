import findChatById from './queryFindChatById';
import userStatistics from './queryUserStatistics';

export const resolver = {
  Query: {
    findChatById,
    userStatistics
  }
};
