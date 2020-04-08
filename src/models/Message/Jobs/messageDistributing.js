import Queue from 'bull';
import { queues } from '../../../config';
import reputationProcessing from '../../ChatMember/Jobs/reputationProcessing';

const messagesQueue = new Queue('app_messages', queues);

const NAME = 'messageDistributing';

messagesQueue.process(NAME, 5, async function (job) {
  const msg = job.data.message;

  if (msg.text || msg.sticker) {
    reputationProcessing.addToQueue(job.data);
  }

  return Promise.resolve();
});

const addToQueue = (message) => {
  messagesQueue.add(
    NAME,
    { message },
    {
      attempts: 3,
      removeOnComplete: true,
    },
  );
};

export default {
  addToQueue,
};
