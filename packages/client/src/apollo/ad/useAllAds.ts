import { gql, useQuery } from '@apollo/client';

import { AllAds, AllAdsVariables } from '../types/AllAds';

export const FIND_ALL_ADS = gql`
  query AllAds(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: String
    $queryString: String
    $mainCategoryId: String
    $categoryId: String
    $inDescription: Boolean
    $location: LocationInput
    $currency: String!
    $filters: [Filter!]
  ) {
    findAllAds(
      page: $page
      perPage: $perPage
      sortField: $sortField
      sortOrder: $sortOrder
      queryString: $queryString
      mainCategoryId: $mainCategoryId
      categoryId: $categoryId
      inDescription: $inDescription
      location: $location
      currency: $currency
      filters: $filters
    ) {
      id
      identifier
      name
      currency
      user {
        id
        name
        email
        favorites {
          id
        }
      }
      price
      description
      images
      createdAt
      updatedAt
      location {
        name
        county
      }
      views
      category {
        id
        identifier
        name
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
      attributeValues {
        key
        value
      }
    }
  }
`;

export const useAllAds = (variables: AllAdsVariables) =>
  useQuery<AllAds, AllAdsVariables>(FIND_ALL_ADS, {
    variables,
  });
