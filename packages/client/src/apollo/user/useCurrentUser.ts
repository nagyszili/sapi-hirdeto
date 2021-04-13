import { gql, useQuery } from '@apollo/client';

import { CurrentUser } from '../types/CurrentUser';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      phoneNumber
      role
      favorites {
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
  }
`;

export const useCurrentUser = () => useQuery<CurrentUser>(CURRENT_USER);
