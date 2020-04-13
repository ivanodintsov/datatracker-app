import R from 'ramda';
import sameReplyMemberService from '../Services/sameReplyMemberService';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redisClient }  from '../../../services/redis';
import Chat from '../../Chat';
import cache from '../../../helpers/cache';

const DEFAULT_TRIGGERS = {
  '+': {
    type: 'INCREASE',
    changer: 1,
  },
  '-': {
    type: 'DECREASE',
    changer: -1,
  }
};

const getChatTriggers = cache(
  (id) => Chat.getReputationTriggers(id),
  id => `rep_tr:${id}`,
  'EX', 360,
);

const getReaction = async (message) => {
  if (message.text) {
    const text = R.toLower(message.text);
    const defaultTrigger = R.prop(text, DEFAULT_TRIGGERS);
  
    if (defaultTrigger) {
      return defaultTrigger;
    }
  
    const triggers = await getChatTriggers(message.chat);
    const trigger = R.find(R.propEq('trigger', text), triggers);
  
    return trigger;
  }
};

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
  const reaction = await getReaction(message);

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
