import { useQuery,gql } from '@apollo/client';

export const FIND_ALL_USER = gql`
query findAllUsers {
    findAllUsers {
      name
    }
  }
`;


// export const useUserQuery = () =>
//   useQuery<, {}>(GET_ALL_USER, );
