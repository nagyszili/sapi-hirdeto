import { makeVar } from '@apollo/client';
import asyncStorage from '@react-native-async-storage/async-storage';

import { CURRENCY } from '../utils/constants';

export const isLoggedInVar = makeVar<boolean>(false);
export const currencyVar = makeVar<string>(CURRENCY.LEI);

asyncStorage.getItem('accessToken').then((token) => isLoggedInVar(!!token));
