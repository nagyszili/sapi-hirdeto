import { useQuery, gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUserMutation(
    $createUserEmail: String!
    $createUserPassword: String!
  ) {
    createUser(email: $createUserEmail, password: $createUserPassword) {
      id
      email
    }
  }
`;

// export const useCreateUserMutation = () =>
//   useMutation<, {}>(CREATE_USER, );
