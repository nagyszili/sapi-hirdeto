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
      negotiable
      status
      description
      createdAt
      updatedAt
      thumbnail
      numberOfImages
      user {
        id
      }
      location {
        name
        county
      }
    }
  }
`;

export const useAdsByUser = (variables: AdsByUserVariables) =>
  useQuery<AdsByUser, AdsByUserVariables>(FIND_ADS_BY_USER, { variables });
