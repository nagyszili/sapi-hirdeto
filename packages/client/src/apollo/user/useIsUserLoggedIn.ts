import { gql, useQuery } from '@apollo/client';

import { LoggedInQuery } from '../types/LoggedInQuery';

export const IS_USER_LOGGED_IN = gql`
  query LoggedInQuery {
    isLoggedIn @client
  }
`;

export const useIsLoggedInQuery = () =>
  useQuery<LoggedInQuery, {}>(IS_USER_LOGGED_IN, { fetchPolicy: 'cache-only' });
