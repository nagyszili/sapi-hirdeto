/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: findAllUsers
// ====================================================

export interface findAllUsers_findAllUsers {
  __typename: "User";
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
}

export interface findAllUsers {
  findAllUsers: findAllUsers_findAllUsers[];
}
