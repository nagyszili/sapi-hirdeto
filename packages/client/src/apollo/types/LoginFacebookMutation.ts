/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginFacebookMutation
// ====================================================

export interface LoginFacebookMutation_loginFacebook {
  __typename: "AccessToken";
  access_token: string;
}

export interface LoginFacebookMutation {
  loginFacebook: LoginFacebookMutation_loginFacebook;
}

export interface LoginFacebookMutationVariables {
  accessToken: string;
}
