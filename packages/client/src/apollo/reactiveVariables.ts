import { makeVar } from '@apollo/client';
import asyncStorage from '@react-native-async-storage/async-storage';

import { CURRENCY } from '../utils/constants';
import { initialUIState, initialSortType } from './initialValues';
import { SortType } from './types';
import { UIStateQuery_uiState } from './types/UIStateQuery';

export const isLoggedInVar = makeVar<boolean>(false);
export const uiStateVar = makeVar<UIStateQuery_uiState>(initialUIState);
export const currencyVar = makeVar<string>(CURRENCY.LEI);
export const sortTypeVar = makeVar<SortType>(initialSortType);

asyncStorage.getItem('accessToken').then((token) => isLoggedInVar(!!token));
