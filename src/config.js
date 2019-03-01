const env = process.env;
const mongoURL = (host, db) => `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@${host.join()}/${db}`;

export const mongoConfig = {
  url: `${mongoURL([ `${env.MONGO_HOST}` ], env.MONGO_DATABASE)}?${env.MONGO_OPTIONS}`,
  options: {
    useNewUrlParser: true,
    connectWithNoPrimary: true,
    readPreference: 'primary'
  }
};

export const memcachedConfig = {
  url: env.MEMCACHED_HOST
};

export const apolloEngineConfig = {
  apiKey: env.APOLLO_ENGINE
};

export const allowedCorsUrls = {};

export const SERVICE_API_TOKEN = 'SERVICE_API_TOKEN';
