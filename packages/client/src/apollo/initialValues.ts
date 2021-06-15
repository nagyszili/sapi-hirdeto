import { SortType, UIState } from './types';

export const initialUIState: UIState = {
  activeAlert: null,
  activeModal: {
    name: 'none',
    params: {},
  },
  isLoading: false,
};

export const initialSortType: SortType = {
  sortField: 'actualizedAt',
  sortOrder: -1,
};
