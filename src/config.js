import fs from 'fs';
const env = process.env;
const mongoURL = (host, db) => `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${host.join()}/${db}`;

export const mongoConfig = {
  url: `${mongoURL([ `${env.MONGO_HOST}` ], env.MONGO_DATABASE)}?${env.MONGO_OPTIONS}`,
  options: {
    useNewUrlParser: true,
    // connectWithNoPrimary: true,
    readPreference: 'primary',
    ssl: env.MONGO_SSL === 'True',
    sslValidate: env.MONGO_SSL_VALIDATE === 'True',
    sslCert: fs.readFileSync(env.MONGO_SSL_CERT),
    sslKey: fs.readFileSync(env.MONGO_SSL_KEY),
    sslPass: env.MONGO_SSL_PASS
  }
};

export const memcachedConfig = {
  url: env.MEMCACHED_HOST
};

export const apolloEngineConfig = {
  apiKey: env.APOLLO_ENGINE
};

export const allowedCorsUrls = {
  'http://localhost': true,
};

export const SERVICE_API_TOKEN = 'SERVICE_API_TOKEN';

export const redis = {
  port: 6379,
  host: 'redis',
  password: 'foobared',
};

export const queues = {
  redis,
};
