import Queue from 'bull';
import { queues } from '../../../config';
import reputationService from '../Services/reputationService';

const reputationQueue = new Queue('app_chat_reputation', queues);

const NAME = 'ChatReputationProcessing';

reputationQueue.process(NAME, 5, async function (job) {
  await reputationService(job.data)

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
