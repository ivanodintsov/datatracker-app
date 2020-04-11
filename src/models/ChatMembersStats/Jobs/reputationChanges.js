import Queue from 'bull';
import { queues } from '../../../config';
import reputationChangesService from '../Services/reputationChangesService';

const reputationChangesQueue = new Queue('app_chat_member_stats_reputation_changes', queues);

const NAME = 'chatMemberStatsReputationChangesProcessing';

reputationChangesQueue.process(NAME, 5, async function (job) {
  await reputationChangesService(job.data);

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
