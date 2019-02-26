import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import { serviceSchema, clientSchema } from './api';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());

const backendServer = new ApolloServer({
  schema: serviceSchema,
  cacheControl: true,
  introspection: true,
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
frontendServer.applyMiddleware({ app, path: '/client' });

export default app;
