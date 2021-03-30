import { gql, useQuery } from '@apollo/client';

import {
  AdByIdentifier,
  AdByIdentifierVariables,
} from '../types/AdByIdentifier';

export const AD_BY_IDENTIFIER = gql`
  query AdByIdentifier($identifier: String!) {
    findAdByIdentifier(identifier: $identifier) {
      id
      identifier
      name
      user {
        id
        name
        email
        phoneNumber
      }
      price
      currency
      description
      createdAt
      updatedAt
      views
      images
      thumbnail
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

export const useAdByIdentifier = (identifier: string) =>
  useQuery<AdByIdentifier, AdByIdentifierVariables>(AD_BY_IDENTIFIER, {
    variables: { identifier },
  });
