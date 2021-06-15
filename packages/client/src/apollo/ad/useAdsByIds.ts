import { gql, useQuery } from '@apollo/client';

import { AdsByIds, AdsByIdsVariables } from '../types/AdsByIds';

export const ADS_BY_IDS = gql`
  query AdsByIds($ids: [String!]!) {
    findAdsByIds(ids: $ids) {
      id
      identifier
      name
      price
      negotiable
      currency
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

export const useAdsByIds = (variables: AdsByIdsVariables) =>
  useQuery<AdsByIds, AdsByIdsVariables>(ADS_BY_IDS, { variables });
