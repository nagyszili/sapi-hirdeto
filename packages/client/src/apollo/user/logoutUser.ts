import asyncStorage from '@react-native-async-storage/async-storage';

import { isLoggedInVar } from '../reactiveVariables';

export const logoutUser = async () => {
  asyncStorage.removeItem('accessToken');
  isLoggedInVar(false);
};
