/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginGoogleMutation
// ====================================================

export interface LoginGoogleMutation_loginGoogle {
  __typename: "AccessToken";
  access_token: string;
}

export interface LoginGoogleMutation {
  loginGoogle: LoginGoogleMutation_loginGoogle;
}

export interface LoginGoogleMutationVariables {
  idToken: string;
}
