import { gql, useMutation } from '@apollo/client';

import {
  UpdateCurrentUserVariables,
  UpdateCurrentUser,
} from '../types/UpdateCurrentUser';

export const UPDATE_CURRENT_USER = gql`
  mutation UpdateCurrentUser(
    $email: String
    $name: String
    $phoneNumber: String
    $profilePicture: Upload
  ) {
    updateCurrentUser(
      email: $email
      name: $name
      phoneNumber: $phoneNumber
      profilePicture: $profilePicture
    ) {
      id
      email
      name
      phoneNumber
      profilePictureUrl
    }
  }
`;

export const useUpdateCurrentUser = () =>
  useMutation<UpdateCurrentUser, UpdateCurrentUserVariables>(
    UPDATE_CURRENT_USER,
    { refetchQueries: ['CurrentUser'] }
  );
