import { gql, useQuery } from '@apollo/client';

import { AllMainCategories } from '../types/AllMainCategories';

export const FIND_ALL_MAIN_CATEGORIES = gql`
  query AllMainCategories {
    findAllMainCategories {
      id
      identifier
      name
    }
  }
`;

export const useAllMainCategories = () =>
  useQuery<AllMainCategories>(FIND_ALL_MAIN_CATEGORIES);
