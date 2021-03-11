import { gql, useQuery } from '@apollo/client';

import { CurrentUser } from '../types/CurrentUser';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      phoneNumber
      favorites {
        id
      }
    }
  }
`;

export const useCurrentUser = () => useQuery<CurrentUser>(CURRENT_USER);
