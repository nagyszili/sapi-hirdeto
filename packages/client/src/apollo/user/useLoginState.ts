import asyncStorage from '@react-native-async-storage/async-storage';

import { client } from '../client';
import { isLoggedInVar } from '../reactiveVariables';
import { CurrentUser } from '../types/CurrentUser';
import { hideModal } from '../ui/modalMutations';
import { setLoading } from '../ui/uiMutations';
import { CURRENT_USER } from './useCurrentUser';

export const useLoginState = () => {
  const onSuccess = async (token?: string) => {
    if (token) {
      await asyncStorage.setItem('accessToken', token);
      isLoggedInVar(true);
      await client.query<CurrentUser>({
        query: CURRENT_USER,
        fetchPolicy: 'network-only',
      });
      setLoading(false);
      hideModal();
    } else {
      onError('could not get access token');
    }
  };
  const onError = (error: any) => {
    console.error(error);
    setLoading(false);
  };
  const onLoading = () => {
    setLoading(true);
  };
  return {
    onSuccess,
    onError,
    onLoading,
  };
};
