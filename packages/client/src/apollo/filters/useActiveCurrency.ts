import { gql, useQuery } from '@apollo/client';

import { ActiveCurrency } from '../types/ActiveCurrency';

export const ACTIVE_CURRENCY = gql`
  query ActiveCurrency {
    currency @client
  }
`;

export const useActiveCurrency = () =>
  useQuery<ActiveCurrency>(ACTIVE_CURRENCY, { fetchPolicy: 'cache-only' });
