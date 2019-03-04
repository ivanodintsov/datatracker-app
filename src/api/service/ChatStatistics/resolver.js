import dailyChatStatistics from './mutationDailyChatStatistics';
import createPreviousStatistics from './mutationPreviousChatStatistics';
import createDailyStatistics from './mutationCreateDailyStatistics';

export const resolver = {
  Mutation: {
    dailyChatStatistics,
    createPreviousStatistics,
    createDailyStatistics,
  }
};
