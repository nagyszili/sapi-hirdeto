/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser {
  __typename: "UserAdsList";
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  loginType: string;
  role: string;
  profilePictureUrl: string | null;
  favorites: string[] | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser;
}
