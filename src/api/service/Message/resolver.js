import allMessages from './queryAllMessages';
import findByChatAndId from './queryFindByChatAndId';

import createMessage from './mutationCreateMessage';
import updateMessage from './mutationUpdateMessage';
import { processMessage } from './mutationProcessMessage';

export const resolver = {
  Query: {
    allMessages,
    findByChatAndId
  },
  
  Mutation: {
    createMessage,
    updateMessage,
    processMessage
  }
};
