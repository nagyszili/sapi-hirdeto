import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

import errors from '../../assets/texts/errors.json';

export const getErrorCode = (error: ApolloError): string | null | undefined =>
  error?.graphQLErrors?.find(
    (graphQLError: GraphQLError) =>
      graphQLError?.extensions?.exception?.response?.code
  )?.extensions?.exception?.response?.code;

export const getErrorMessage = (error: ApolloError): string => {
  const errorCode = getErrorCode(error);
  return errors[errorCode as keyof typeof errors] ?? errors['error'];
};
