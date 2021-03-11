import * as React from 'react';

import texts from '../../assets/texts/texts.json';
import { updateSortType } from '../apollo/sort/updateSortType';
import { useSortType } from '../apollo/sort/useSortType';
import { Select } from './Filters/Select';

const sortBy = () => ({
  new: () => updateSortType('createdAt', -1),
  ascendingByPrice: () => updateSortType('price', 1),
  descendingByPrice: () => updateSortType('price', -1),
});

type SortType = keyof ReturnType<typeof sortBy>;

const elements = [
  { name: texts['new'], identifier: 'new', id: 0 },
  { name: texts['ascendingByPrice'], identifier: 'ascendingByPrice', id: 1 },
  { name: texts['descendingByPrice'], identifier: 'descendingByPrice', id: 2 },
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
    <Select
      elements={elements}
      setSelectedElement={setSelectedElement}
      selectedElement={getSelectedElement()}
    />
  );
};
