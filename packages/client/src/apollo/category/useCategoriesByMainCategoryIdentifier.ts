import { gql, useQuery } from '@apollo/client';

import {
  CategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifierVariables,
} from '../types/CategoriesByMainCategoryIdentifier';

export const FIND_CATEGORIES_BY_MAIN_CATEGORY_IDENTIFIER = gql`
  query CategoriesByMainCategoryIdentifier($identifier: String!) {
    findCategoriesByMainCategoryIdentifier(identifier: $identifier) {
      id
      name
      identifier
      attributes {
        title
        type
        possibleValues {
          dependingKey
          values
        }
        dependsBy
        required
      }
      mainCategory {
        identifier
        name
      }
    }
  }
`;

export const useCategoriesByMainCategoryIdentifier = (identifier: string) =>
  useQuery<
    CategoriesByMainCategoryIdentifier,
    CategoriesByMainCategoryIdentifierVariables
  >(FIND_CATEGORIES_BY_MAIN_CATEGORY_IDENTIFIER, { variables: { identifier } });
