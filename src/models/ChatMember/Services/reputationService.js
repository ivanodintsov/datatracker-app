import sameReplyMemberService from '../Services/sameReplyMemberService';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient }  from '../../../services/redis';

const getReactionItems = () => ({
  '+': {
    type: 'INCREASE',
    changer: 1,
  },
  '-': {
    type: 'DECREASE',
    changer: -1,
  }
});

const opts = {
  storeClient: redisClient,
  points: 1,
  duration: 60,

  execEvenly: false,
  blockDuration: 0,
  keyPrefix: 'rep_rl',
};

const reputationRateLimiter = new RateLimiterRedis(opts);

const reputationService = async (message) => {
  const reaction = getReactionItems()[message.text];

  if (!reaction) {
    return;
  }

  const isSameMemberMessage = await sameReplyMemberService(message);

  if (isSameMemberMessage === true) {
    return;
  }

  try {
    await reputationRateLimiter.consume(`${message.chat}:${message.from}:${isSameMemberMessage.from}`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      return;
    }
  }

  return {
    reaction,
    repliedMessage: isSameMemberMessage,
  };
};

export default reputationService;
