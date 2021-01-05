import { gql, useQuery } from '@apollo/client';

import { FindAllUsers_findAllUsers } from '../types/FindAllUsers';

export const FIND_ALL_USER = gql`
  query FindAllUsers {
    findAllUsers {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

export const useUsersQuery = () =>
  useQuery<FindAllUsers_findAllUsers>(FIND_ALL_USER);
