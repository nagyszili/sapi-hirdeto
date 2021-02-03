import { gql } from '@apollo/client';

export const IS_USER_LOGGED_IN = gql`
  query LoggedInQuery {
    isLoggedIn @client
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

// export const LOGIN_GOOGLE = gql`
//   mutation LoginGoogleMutation($idToken: String!, $referredCode: String) {
//     loginGoogle(idToken: $idToken, referredCode: $referredCode) {
//       access_token
//     }
//   }
// `;

// export const LOGIN_FACEBOOK = gql`
//   mutation LoginFacebookMutation($accessToken: String!, $referredCode: String) {
//     loginFacebook(accessToken: $accessToken, referredCode: $referredCode) {
//       access_token
//     }
//   }
// `;
