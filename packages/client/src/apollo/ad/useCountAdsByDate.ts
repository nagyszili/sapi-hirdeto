import { gql, useQuery } from '@apollo/client';

import {
  CountAdsByDateVariables,
  CountAdsByDate,
} from '../types/CountAdsByDate';

export const COUNT_ADS_BY_DATE = gql`
  query CountAdsByDate($fromDate: DateTime!, $toDate: DateTime!) {
    countAdsByDate(fromDate: $fromDate, toDate: $toDate)
  }
`;

export const useCountAdsByDate = (variables: CountAdsByDateVariables) =>
  useQuery<CountAdsByDate, CountAdsByDateVariables>(COUNT_ADS_BY_DATE, {
    variables: { ...variables },
  });
