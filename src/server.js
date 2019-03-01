import express from 'express';
import R from 'ramda';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import { serviceSchema, clientSchema } from './api';
import { allowedCorsUrls, SERVICE_API_TOKEN } from './config';

const app = express();

const originCors = obj => (origin, callback) => {
  if (R.propOr(false, origin, obj)) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
};

const checkToken = R.equals(SERVICE_API_TOKEN);
const backendServer = new ApolloServer({
  schema: serviceSchema,
  cacheControl: true,
  introspection: true,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = checkToken(token);

    if (!user) {
      throw new AuthenticationError('Invalid token');
    }

    return { user };
  },
});
backendServer.applyMiddleware({ app, path: '/service' });

const frontendServer = new ApolloServer({
  schema: clientSchema,
  introspection: true,
  formatError(err) {
    return {
      message: err.message,
      code: err.originalError && err.originalError.code,
      locations: err.locations,
      path: err.path
    };
  }
});
frontendServer.applyMiddleware({
  app,
  path: '/client',
  cors: {
    origin: originCors(allowedCorsUrls),
    optionsSuccessStatus: 200
  },
});

export default app;
