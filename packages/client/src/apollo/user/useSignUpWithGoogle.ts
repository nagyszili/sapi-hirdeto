import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

import { client } from '../client';
import {
  LoginGoogleMutation,
  LoginGoogleMutationVariables,
} from '../types/LoginGoogleMutation';
import { LOGIN_GOOGLE } from './loginMutations';
import { useLoginState } from './useLoginState';

WebBrowser.maybeCompleteAuthSession();

export const useSignUpWithGoogle = () => {
  const { onSuccess, onError, onLoading } = useLoginState();
  const [, response, promptAsync] = Google.useIdTokenAuthRequest({
    ...Constants?.manifest?.extra?.googleConfig,
  });

  const signUp = async () => {
    onLoading();
    // @ts-ignore
    const idToken = response.params.id_token ?? response.authentication.idToken;
    try {
      const loginResult = await client.mutate<
        LoginGoogleMutation,
        LoginGoogleMutationVariables
      >({
        mutation: LOGIN_GOOGLE,
        variables: { idToken },
      });
      await onSuccess(loginResult?.data?.loginGoogle?.access_token);
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

  return { signUpWithGoogle: promptAsync };
};
