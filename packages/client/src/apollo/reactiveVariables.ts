import { makeVar } from '@apollo/client';
import asyncStorage from '@react-native-async-storage/async-storage';

import { CURRENCY } from '../utils/constants';
import { initialUIState, initialSortType } from './initialValues';
import { SortType, ListTypeEnum, UIState } from './types';

export const isLoggedInVar = makeVar<boolean>(false);
export const uiStateVar = makeVar<UIState>(initialUIState);
export const currencyVar = makeVar<string>(CURRENCY.LEI);
export const sortTypeVar = makeVar<SortType>(initialSortType);
export const asyncFavoritesVar = makeVar<string[]>([]);
export const listTypeVar = makeVar<ListTypeEnum>(ListTypeEnum.grid);

asyncStorage.getItem('accessToken').then((token) => isLoggedInVar(!!token));

asyncStorage
  .getItem('favorites')
  .then((favorites) =>
    asyncFavoritesVar(favorites ? JSON.parse(favorites) : [])
  );
