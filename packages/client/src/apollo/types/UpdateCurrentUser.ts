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
  name: string;
  phoneNumber: string | null;
}

export interface UpdateCurrentUser {
  updateCurrentUser: UpdateCurrentUser_updateCurrentUser;
}

export interface UpdateCurrentUserVariables {
  name?: string | null;
  phoneNumber?: string | null;
}
