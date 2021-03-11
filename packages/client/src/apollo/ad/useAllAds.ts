import { gql, useQuery } from '@apollo/client';

import { AllAds, AllAdsVariables } from '../types/AllAds';

export const FIND_ALL_ADS = gql`
  query AllAds(
    $page: Int
    $perPage: Int
    $sortField: String
    $sortOrder: Int
    $queryString: String
    $mainCategoryIdentifier: String
    $categoryIdentifier: String
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
      mainCategoryIdentifier: $mainCategoryIdentifier
      categoryIdentifier: $categoryIdentifier
      inDescription: $inDescription
      location: $location
      currency: $currency
      filters: $filters
    ) {
      id
      identifier
      name
      price
      currency
      description
      createdAt
      updatedAt
      thumbnail
      numberOfImages
      location {
        longitude
        latitude
        name
        county
      }
      views
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
