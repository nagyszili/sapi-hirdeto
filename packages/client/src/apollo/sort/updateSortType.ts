import { sortTypeVar } from '../reactiveVariables';

export const updateSortType = (sortField?: string, sortOrder?: number) => {
  sortTypeVar({ sortOrder, sortField });
};
