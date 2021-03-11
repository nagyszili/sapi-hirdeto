/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_favorites {
  __typename: "Ad";
  id: string;
}

export interface CurrentUser_currentUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  favorites: CurrentUser_currentUser_favorites[] | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser;
}
