import { gql, useQuery } from '@apollo/client';

import { CurrentUser } from '../types/CurrentUser';

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      name
      email
      phoneNumber
      loginType
      role
      profilePictureUrl
      favorites
    }
  }
`;

export const useCurrentUser = () => useQuery<CurrentUser>(CURRENT_USER);
