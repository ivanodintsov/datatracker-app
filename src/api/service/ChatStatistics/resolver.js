import dailyChatStatistics from './mutationDailyChatStatistics';
import createPreviousStatistics from './mutationPreviousChatStatistics';

export const resolver = {
  Mutation: {
    dailyChatStatistics,
    createPreviousStatistics,
  }
};
