import R from 'ramda';
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import reduceNumber from '../helpers/reduceNumber';

export const NFormatNumber = new GraphQLScalarType({
  name: 'NFormatNumber',
  description: 'Format number(1100 => 1.1K, 1200000 => 1.2M, etc)',
  
  serialize(value) {
    return reduceNumber(value);
  }
});

export const baseTypes = {
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
  }),

  Long: new GraphQLScalarType({
    name: 'Long',
    description: 'Long scalar type',

    parseValue(ast) {
      return parseInt(ast.value, 10);
    },

    serialize(value) {
      return value.toNumber();
    },

    parseLiteral(ast) {
      return parseInt(ast.value, 10);
    }
  })
};
