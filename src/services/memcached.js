import { promisify } from 'util';
import Memcached from 'memcached';
import { cacheFunction } from '../helpers';
import { memcachedConfig } from '../config';

const memcached = new Memcached(memcachedConfig.url);

const memcachedGet = promisify(memcached.get).bind(memcached);
const memcachedSet = promisify(memcached.set).bind(memcached);

const promisedMemcached = {
  get: memcachedGet,
  set: memcachedSet
};

export default {
  ...promisedMemcached,
  query: cacheFunction(JSON, promisedMemcached)
};
