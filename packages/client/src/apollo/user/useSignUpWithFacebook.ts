import * as Facebook from 'expo-auth-session/providers/facebook';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

import { client } from '../client';
import {
  LoginFacebookMutation,
  LoginFacebookMutationVariables,
} from '../types/LoginFacebookMutation';
import { LOGIN_FACEBOOK } from './loginMutations';
import { useLoginState } from './useLoginState';

WebBrowser.maybeCompleteAuthSession();

export const useSignUpWithFacebook = () => {
  const { onSuccess, onError, onLoading } = useLoginState();
  const [, response, promptAsync] = Facebook.useAuthRequest({
    clientId: Constants?.manifest?.extra?.facebookAppId,
  });

  const signUp = async () => {
    onLoading();

    try {
      //@ts-ignore
      const accessToken = response.params.access_token;

      const loginResult = await client.mutate<
        LoginFacebookMutation,
        LoginFacebookMutationVariables
      >({
        mutation: LOGIN_FACEBOOK,
        variables: { accessToken },
      });
      await onSuccess(loginResult?.data?.loginFacebook?.access_token);
    } catch (e) {
      onError(e);
    }
  };

  useEffect(() => {
    if (response?.type === 'success') {
      signUp();
    } else if (response) {
      //@ts-ignore
      onError(response.error);
    }
  }, [response]);

  return { signUpWithFacebook: promptAsync };
};
