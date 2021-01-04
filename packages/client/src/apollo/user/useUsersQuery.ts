import { useQuery, gql } from '@apollo/client';

export const FIND_ALL_USER = gql`
  query findAllUsers {
    findAllUsers {
      id
      firstName
      lastName
      email
      phoneNumber
    }
  }
`;

// export const useUserQuery = () =>
//   useQuery<, {}>(GET_ALL_USER, );
