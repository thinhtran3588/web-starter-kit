import { GraphQLError } from 'graphql';

export const getErrorMessage = (errors: readonly GraphQLError[], matchedCodes?: { [code: string]: string }): string => {
  if (errors[0].extensions && matchedCodes && matchedCodes[errors[0].extensions.code]) {
    return matchedCodes[errors[0].extensions.code];
  }
  return errors[0].message;
};
