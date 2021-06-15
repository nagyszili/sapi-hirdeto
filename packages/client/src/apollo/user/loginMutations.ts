import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

export const LOGIN_GOOGLE = gql`
  mutation LoginGoogleMutation($idToken: String!) {
    loginGoogle(idToken: $idToken) {
      access_token
    }
  }
`;

export const LOGIN_FACEBOOK = gql`
  mutation LoginFacebookMutation($accessToken: String!) {
    loginFacebook(accessToken: $accessToken) {
      access_token
    }
  }
`;
