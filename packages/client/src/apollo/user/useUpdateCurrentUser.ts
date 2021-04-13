import { gql, useMutation } from '@apollo/client';

import {
  UpdateCurrentUserVariables,
  UpdateCurrentUser,
} from '../types/UpdateCurrentUser';

export const UPDATE_CURRENT_USER = gql`
  mutation UpdateCurrentUser($name: String, $phoneNumber: String) {
    updateCurrentUser(name: $name, phoneNumber: $phoneNumber) {
      id
      name
      phoneNumber
    }
  }
`;

export const useUpdateCurrentUser = () =>
  useMutation<UpdateCurrentUser, UpdateCurrentUserVariables>(
    UPDATE_CURRENT_USER
  );
