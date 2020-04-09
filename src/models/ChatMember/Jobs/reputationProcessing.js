import Queue from 'bull';
import { queues } from '../../../config';
import reputationService from '../Services/reputationService';
import ChatMember from '../ChatMember';
import ChatDailyReputation from '../../ChatDailyStatistics/Jobs/reputationProcessing';
import ChatMembersStatsReputation from '../../ChatMembersStats/Jobs/reputationProcessing';

const reputationQueue = new Queue('app_reputation', queues);

const NAME = 'reputationProcessing';

reputationQueue.process(NAME, 5, async function (job) {
  const message = job.data.message;

  const reputation = await reputationService(message);

  if (!reputation) {
    return;
  }

  await ChatMember.changeReputation({
    chat: reputation.replyedMessage.chat,
    user: reputation.replyedMessage.from,
    type: reputation.reaction.type,
  });

  ChatDailyReputation.addToQueue({ reputation, message });
  ChatMembersStatsReputation.addToQueue({ reputation, message });

  return Promise.resolve();
});

const addToQueue = (data) => {
  reputationQueue.add(
    NAME,
    data,
    {
      attempts: 3,
      removeOnComplete: true,
    },
  );
};

export default {
  addToQueue,
};
