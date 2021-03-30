import { gql, useQuery } from '@apollo/client';

import { AdsByUser, AdsByUserVariables } from '../types/AdsByUser';

export const FIND_ADS_BY_USER = gql`
  query AdsByUser($page: Int, $perPage: Int) {
    findAdsByUser(page: $page, perPage: $perPage) {
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

export const useAdsByUser = (variables: AdsByUserVariables) =>
  useQuery<AdsByUser, AdsByUserVariables>(FIND_ADS_BY_USER, { variables });
