import { useReactiveVar } from '@apollo/client';

import texts from '../../assets/texts/texts.json';
import { sortTypeVar } from '../apollo/reactiveVariables';
import { updateSortType } from '../apollo/sort/updateSortType';

export const useSort = () => {
  const sortBy = () => ({
    new: () => updateSortType('actualizedAt', -1),
    ascendingByPrice: () => updateSortType('price', 1),
    descendingByPrice: () => updateSortType('price', -1),
  });

  type SortType = keyof ReturnType<typeof sortBy>;

  const elements = [
    { label: texts['new'], value: 'new' },
    { label: texts['ascendingByPrice'], value: 'ascendingByPrice' },
    { label: texts['descendingByPrice'], value: 'descendingByPrice' },
  ];

  const sort = useReactiveVar(sortTypeVar);

  const setSelectedElement = (element: string) =>
    sortBy()[element as SortType]();

  const getSelectedElement = () =>
    sort?.sortField === 'price' && sort.sortOrder === 1
      ? 'ascendingByPrice'
      : sort?.sortField === 'price' && sort.sortOrder === -1
      ? 'descendingByPrice'
      : sort?.sortField === 'actualizedAt' && sort.sortOrder === -1
      ? 'new'
      : '';

  return { setSelectedElement, getSelectedElement, elements };
};
