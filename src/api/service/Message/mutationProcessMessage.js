import { createMessage } from './mutationCreateMessage';
import { mutationDailyChatStatistics } from '../ChatStatistics/mutationDailyChatStatistics';
import { createUser } from '../User/mutationCreateUser';
import newChatMember from '../ChatMember/mutationNewChatMember';
import { statisticsFromMessage } from '../../../entity/Statistics';
import messageDistributing from '../../../models/Message/Jobs/messageDistributing';

export const processMessage = async (_, { input, user }) => {
  const message = await createMessage(_, { input });

  messageDistributing.addToQueue(input);

  const statistics = statisticsFromMessage(input);
  await Promise.all([
    createUser(_, { input: user }),
    newChatMember(_, { input: { chat: input.chat, user: user.id } })
  ]);
  await mutationDailyChatStatistics(_, { input: statistics });
  return message;
};
