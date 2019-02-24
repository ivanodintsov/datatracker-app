import { makeExecutableSchema } from 'graphql-tools';
import schemaglue from 'schemaglue';
import { ROOT } from '../constants/pathes';

const serviceGQL = schemaglue(`${ROOT}/api/service`);
export const serviceSchema = makeExecutableSchema({
  typeDefs: serviceGQL.schema,
  resolvers: serviceGQL.resolver
});

const clientGQL = schemaglue(`${ROOT}/api/client`);
export const clientSchema = makeExecutableSchema({
  typeDefs: clientGQL.schema,
  resolvers: clientGQL.resolver
});
