import { gql, useQuery } from '@apollo/client';

import {
  CategoriesByMainCategoryId,
  CategoriesByMainCategoryIdVariables,
} from '../types/CategoriesByMainCategoryId';

export const FIND_CATEGORIES_BY_MAIN_CATEGORY_ID = gql`
  query CategoriesByMainCategoryId($id: String!) {
    findCategoriesByMainCategoryId(id: $id) {
      id
      name
      identifier
      attributes {
        title
        type
        possibleValues
      }
      mainCategory {
        id
        identifier
        name
      }
    }
  }
`;

export const useCategoriesByMainCategoryId = (id: string) =>
  useQuery<CategoriesByMainCategoryId, CategoriesByMainCategoryIdVariables>(
    FIND_CATEGORIES_BY_MAIN_CATEGORY_ID,
    { variables: { id } },
  );
