import chat from './queryChat';
import userStatistics from './queryUserStatistics';

export const resolver = {
  Query: {
    chat,
    userStatistics
  }
};
