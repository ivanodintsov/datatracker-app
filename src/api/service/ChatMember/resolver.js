import allMembers from './queryAllMembers';
import notUpdatedChatMembers from './queryNotUpdatedChatMembers';
import chatMemberStatistics from '../../client/ChatMember/chatMemberStatistics';

import newChatMember from './mutationNewChatMember';
import updateChatMember from './mutationUpdateChatMember';

export const resolver = {
  Query: {
    allMembers,
    notUpdatedChatMembers,
    chatMemberStatistics
  },

  Mutation: {
    newChatMember,
    updateChatMember
  }
};
