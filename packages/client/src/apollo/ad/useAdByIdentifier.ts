import { gql, useQuery } from '@apollo/client';

import {
  AdByIdentifier,
  AdByIdentifierVariables,
} from '../types/AdByIdentifier';

export const AD_BY_IDENTIFIER = gql`
  query AdByIdentifier($userId: String, $identifier: String!) {
    findAdByIdentifier(userId: $userId, identifier: $identifier) {
      id
      identifier
      name
      status
      user {
        id
        name
        email
        phoneNumber
        profilePictureUrl
      }
      price
      currency
      negotiable
      description
      createdAt
      updatedAt
      actualizedAt
      views
      images {
        priority
        url
      }
      thumbnail {
        priority
        url
      }
      location {
        longitude
        latitude
        name
        county
      }
      category {
        id
        identifier
        name
        attributes {
          title
          type
          possibleValues {
            dependingKey
            values
          }
          dependsBy
        }
        mainCategory {
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

export const useAdByIdentifier = (identifier: string, userId?: string) =>
  useQuery<AdByIdentifier, AdByIdentifierVariables>(AD_BY_IDENTIFIER, {
    variables: { userId, identifier },
  });
