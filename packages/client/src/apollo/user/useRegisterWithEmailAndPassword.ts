import { client } from '../client';
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '../types/CreateUserMutation';
import { CREATE_USER } from './useCreateUserMutation';
import { useLoginState } from './useLoginState';
import { useLoginWithEmailAndPassword } from './useLoginWithEmailAndPassword';

export const useRegisterWithEmailAndPassword = () => {
  const { loginWithEmailAndPassword } = useLoginWithEmailAndPassword();
  const { onError, onLoading } = useLoginState();

  const registerWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    onLoading();
    try {
      const result = await client.mutate<
        CreateUserMutation,
        CreateUserMutationVariables
      >({
        mutation: CREATE_USER,
        variables: {
          email,
          password,
        },
      });
      loginWithEmailAndPassword(email, password);

      return { success: result, error: false };
    } catch (error) {
      onError(error);
      return { success: false, error };
    }
  };

  return {
    registerWithEmailAndPassword,
  };
};
