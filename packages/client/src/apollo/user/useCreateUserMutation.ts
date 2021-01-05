import { gql, useMutation } from '@apollo/client';

import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '../types/CreateUserMutation';

export const CREATE_USER = gql`
  mutation CreateUserMutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const useCreateUserMutation = () =>
  useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER);
