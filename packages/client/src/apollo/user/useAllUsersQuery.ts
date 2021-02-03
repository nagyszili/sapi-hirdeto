import { gql, useQuery } from '@apollo/client';

import { AllUsers_findAllUsers } from '../types/AllUsers';

export const FIND_ALL_USER = gql`
  query AllUsers {
    findAllUsers {
      id
      name
      email
      phoneNumber
    }
  }
`;

export const useAllUsersQuery = () =>
  useQuery<AllUsers_findAllUsers>(FIND_ALL_USER);
