/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCurrentUser
// ====================================================

export interface UpdateCurrentUser_updateCurrentUser {
  __typename: "User";
  id: string;
  email: string;
  name: string;
  phoneNumber: string | null;
  profilePictureUrl: string | null;
}

export interface UpdateCurrentUser {
  updateCurrentUser: UpdateCurrentUser_updateCurrentUser;
}

export interface UpdateCurrentUserVariables {
  email?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  profilePicture?: any | null;
}
