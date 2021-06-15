import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

import errors from '../../assets/texts/errors.json';

export const getErrorCode = (error: ApolloError): string | null | undefined =>
  error?.graphQLErrors?.find(
    (graphQLError: GraphQLError) =>
      graphQLError?.extensions?.exception?.response?.code,
  )?.extensions?.exception?.response?.code;

export const getErrorMessage = (error: ApolloError): string => {
  const errorCode = getErrorCode(error);
  return errors[errorCode as keyof typeof errors] ?? errors['error'];
};

export const reportError = (error: Error) => {
  console.error(error);
  return Platform.OS === 'web'
    ? Sentry.Browser.captureException(error)
    : Sentry.Native.captureException(error);
};
