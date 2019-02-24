import R from 'ramda';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

import findChatById from './queryFindChatById';
import userStatistics from './queryUserStatistics';

export const resolver = {
  Query: {
    findChatById,
    userStatistics
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    parseValue(value) {
      return new Date(value);
    },

    serialize(value) {
      if (R.is(String, value)) {
        return new Date(value).getTime();
      }

      return value.getTime();
    },

    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      } else if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    }
  })
};
