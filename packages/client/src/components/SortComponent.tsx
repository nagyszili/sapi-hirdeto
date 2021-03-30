import * as React from 'react';
import { View } from 'react-native';

import texts from '../../assets/texts/texts.json';
import { updateSortType } from '../apollo/sort/updateSortType';
import { useSortType } from '../apollo/sort/useSortType';
import { SelectInput } from './Filters/Select/SelectInput';

const sortBy = () => ({
  new: () => updateSortType('createdAt', -1),
  ascendingByPrice: () => updateSortType('price', 1),
  descendingByPrice: () => updateSortType('price', -1),
});

type SortType = keyof ReturnType<typeof sortBy>;

const elements = [
  { label: texts['new'], value: 'new' },
  { label: texts['ascendingByPrice'], value: 'ascendingByPrice' },
  { label: texts['descendingByPrice'], value: 'descendingByPrice' },
];

export const SortComponent: React.FC<{}> = () => {
  const { data: sort } = useSortType();

  const setSelectedElement = (element: string) =>
    sortBy()[element as SortType]();

  const getSelectedElement = () =>
    sort?.sortType.sortField === 'price' && sort.sortType.sortOrder === 1
      ? 'ascendingByPrice'
      : sort?.sortType.sortField === 'price' && sort.sortType.sortOrder === -1
      ? 'descendingByPrice'
      : sort?.sortType.sortField === 'createdAt' &&
        sort.sortType.sortOrder === -1
      ? 'new'
      : '';

  return (
    <View style={{ zIndex: 100 }}>
      <SelectInput
        label={texts['sort']}
        elements={elements}
        setSelectedElement={setSelectedElement}
        selectedElement={getSelectedElement()}
      />
    </View>
  );
};
