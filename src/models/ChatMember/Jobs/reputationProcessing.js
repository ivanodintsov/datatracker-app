import Queue from 'bull';
import { queues } from '../../../config';
import reputationService from '../Services/reputationService';

const reputationQueue = new Queue('app_reputation', queues);

const NAME = 'reputationProcessing';

reputationQueue.process(NAME, 5, async function (job) {
  const message = job.data.message;

  await reputationService(message);

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
