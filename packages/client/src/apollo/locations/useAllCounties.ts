import { gql, useQuery } from '@apollo/client';

import { AllCounties } from '../types/AllCounties';

export const ALL_COUNTIES = gql`
  query AllCounties {
    allCounties
  }
`;

export const useAllCounties = () => useQuery<AllCounties>(ALL_COUNTIES);
