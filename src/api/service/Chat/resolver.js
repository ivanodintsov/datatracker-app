import allChats from './queryAllChats';
import findChatById from './queryFindByChatId';
import notUpdatedChats from './queryNotUpdatedChats';
import chatStatistics from './queryChatStatistics';

import createChat from './mutationCreateChat';
import migrateChat from './mutationMigrateChat';
import updateChat from './mutationUpdateChat';
import newUsers from './mutationNewUsers';
import leftUser from './mutationLeftUser';

export const resolver = {
  Query: {
    allChats,
    findChatById,
    notUpdatedChats,
    chatStatistics
  },

  Mutation: {
    createChat,
    migrateChat,
    updateChat,
    newUsers,
    leftUser
  }
};
