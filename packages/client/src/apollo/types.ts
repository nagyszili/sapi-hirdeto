import {
  ModalName,
  PossibleModalParams,
  ModalButtonTypes,
} from '../modals/types';

export interface SortType {
  sortField?: string | null;
  sortOrder?: number | null;
}

export enum ListTypeEnum {
  gallery = 'gallery',
  grid = 'grid',
  list = 'list',
}

export interface ActiveModal {
  name: ModalName;
  params: PossibleModalParams;
}
export interface ActiveAlert_buttons {
  text: string;
  onPress?: () => void;
  type: ModalButtonTypes;
}
export interface ActiveAlert {
  title: string;
  message: string;
  buttons?: ActiveAlert_buttons[];
  cancelButton?: ActiveAlert_buttons;
}
export interface UIState {
  activeModal: ActiveModal;
  activeAlert: ActiveAlert | null;
  isLoading: boolean;
}
