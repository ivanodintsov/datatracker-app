import Queue from 'bull';
import { queues } from '../../../config';
import ChatMember from '../ChatMember';

const reputationChangesQueue = new Queue('app_reputation_changes', queues);

const NAME = 'reputationChangesProcessing';

reputationChangesQueue.process(NAME, 5, async function (job) {
  const { reputation, message } = job.data;

  await ChatMember.changeReputationChanges({
    chat: message.chat,
    user: message.from,
    type: reputation.reaction,
  });

  return Promise.resolve();
});

const addToQueue = (data) => {
  reputationChangesQueue.add(
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
