import { gql, useQuery } from '@apollo/client';

import { currencyVar } from '../reactiveVariables';
import { CountAllAdsVariables, CountAllAds } from '../types/CountAllAds';

export const COUNT_ADS = gql`
  query CountAllAds(
    $queryString: String
    $mainCategoryIdentifier: String
    $categoryIdentifier: String
    $inDescription: Boolean
    $location: LocationInput
    $currency: String!
    $filters: [Filter!]
  ) {
    countAllAds(
      queryString: $queryString
      mainCategoryIdentifier: $mainCategoryIdentifier
      categoryIdentifier: $categoryIdentifier
      inDescription: $inDescription
      location: $location
      currency: $currency
      filters: $filters
    )
  }
`;

export const useCountAds = (variables: CountAllAdsVariables) =>
  useQuery<CountAllAds, CountAllAdsVariables>(COUNT_ADS, {
    variables: { ...variables, currency: currencyVar() },
  });
