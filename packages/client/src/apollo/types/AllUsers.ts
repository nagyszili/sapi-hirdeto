/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllUsers
// ====================================================

export interface AllUsers_findAllUsers {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: string;
}

export interface AllUsers {
  findAllUsers: AllUsers_findAllUsers[];
}
