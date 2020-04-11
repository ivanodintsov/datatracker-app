import Queue from 'bull';
import { queues } from '../../../config';
import reputationService from '../Services/reputationService';
import ChatMember from '../ChatMember';
import ChatDailyReputation from '../../ChatDailyStatistics/Jobs/reputationProcessing';
import ChatMembersStatsReputation from '../../ChatMembersStats/Jobs/reputationProcessing';
import ChatMembersStatsReputationChanges from '../../ChatMembersStats/Jobs/reputationChanges';
import ChatReputation from '../../Chat/Jobs/reputationProcessing';
import ChatMemberReputationChanges from './reputationChanges';

const reputationQueue = new Queue('app_reputation', queues);

const NAME = 'reputationProcessing';

reputationQueue.process(NAME, 5, async function (job) {
  const message = job.data.message;

  const reputation = await reputationService(message);

  if (!reputation) {
    return;
  }

  await ChatMember.changeReputation({
    chat: reputation.repliedMessage.chat,
    user: reputation.repliedMessage.from,
    type: reputation.reaction,
  });

  ChatMemberReputationChanges.addToQueue({ reputation, message });
  ChatReputation.addToQueue({ reputation, message });
  ChatDailyReputation.addToQueue({ reputation, message });
  ChatMembersStatsReputation.addToQueue({ reputation, message });
  ChatMembersStatsReputationChanges.addToQueue({ reputation, message });

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
