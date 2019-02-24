import R from 'ramda';

export const cacheFunction = R.curry((strUtil, memcached, fn) => async (key, ...args) => {
  const data = await memcached.get(key);

  if (data) {
    const stats = strUtil.parse(data);
    return stats;
  }

  const stats = await fn(...args);
  await memcached.set(key, strUtil.stringify(stats), 600);

  return stats;
});
