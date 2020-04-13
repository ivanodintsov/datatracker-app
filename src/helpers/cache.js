import R from 'ramda';
import { redisClient }  from '../services/redis';

export const cache = (fn, key, ...opts) => {
  const wrapped = async (...args) => {
    let cacheKey = key;

    if (R.is(Function, cacheKey)) {
      cacheKey = cacheKey(...args);
    }

    const chached = await redisClient.get(cacheKey);
  
    if (chached) {
      return JSON.parse(chached);
    }

    const response = await fn(...args);

    redisClient.set(cacheKey, JSON.stringify(response), ...opts);

    return response;
  };

  return wrapped;
};

export default cache;
