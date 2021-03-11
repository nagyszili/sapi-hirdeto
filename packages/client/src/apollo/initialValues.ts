import { SortType } from './types';
import { UIStateQuery_uiState } from './types/UIStateQuery';

export const initialUIState: UIStateQuery_uiState = {
  activeAlert: null,
  activeModal: {
    name: 'none',
    params: {},
  },
  isLoading: false,
};

export const initialSortType: SortType = {
  sortField: 'createdAt',
  sortOrder: -1,
};
