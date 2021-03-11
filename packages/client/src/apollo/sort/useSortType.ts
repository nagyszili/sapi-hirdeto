import { gql, useQuery } from '@apollo/client';

import { SortQuery } from '../types/SortQuery';

export const SORT_TYPE = gql`
  query SortQuery {
    sortType @client {
      sortField
      sortOrder
    }
  }
`;

export const useSortType = () => useQuery<SortQuery>(SORT_TYPE);
