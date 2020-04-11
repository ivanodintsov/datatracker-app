import Redis from 'ioredis';
import { redis } from '../config';

export const redisClient = new Redis({
  ...redis,
  enableOfflineQueue: false,
});

export default redisClient;
