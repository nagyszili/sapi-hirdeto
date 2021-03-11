import { client } from '../client';
import {
  LoginUserMutation,
  LoginUserMutationVariables,
} from '../types/LoginUserMutation';
import { LOGIN_USER } from './useLogin';
import { useLoginState } from './useLoginState';

export const useLoginWithEmailAndPassword = () => {
  const { onSuccess, onError, onLoading } = useLoginState();

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    onLoading();
    try {
      const loginResult = await client.mutate<
        LoginUserMutation,
        LoginUserMutationVariables
      >({
        mutation: LOGIN_USER,
        variables: { email, password },
      });
      await onSuccess(loginResult!.data!.login.access_token);
      return { success: loginResult, error: false };
    } catch (error) {
      onError(error);
      return { success: false, error };
    }
  };

  return { loginWithEmailAndPassword };
};
