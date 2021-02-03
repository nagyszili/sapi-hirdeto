/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginUserMutation
// ====================================================

export interface LoginUserMutation_login {
  __typename: "AccessToken";
  access_token: string;
}

export interface LoginUserMutation {
  login: LoginUserMutation_login;
}

export interface LoginUserMutationVariables {
  email: string;
  password: string;
}
