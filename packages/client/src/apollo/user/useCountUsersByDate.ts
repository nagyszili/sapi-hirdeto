import { gql, useQuery } from '@apollo/client';

import {
  CountUsersByDateVariables,
  CountUsersByDate,
} from '../types/CountUsersByDate';

export const COUNT_USERS_BY_DATE = gql`
  query CountUsersByDate($fromDate: DateTime!, $toDate: DateTime!) {
    countUsersByDate(fromDate: $fromDate, toDate: $toDate)
  }
`;

export const useCountUsersByDate = (variables: CountUsersByDateVariables) =>
  useQuery<CountUsersByDate, CountUsersByDateVariables>(COUNT_USERS_BY_DATE, {
    variables: { ...variables },
  });
