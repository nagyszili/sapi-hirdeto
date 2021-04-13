import {
  PossibleModalParams,
  ModalButtonTypes,
  ModalName,
} from '../../modals/types';
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UIStateQuery
// ====================================================

export interface UIStateQuery_uiState_activeModal {
  name: ModalName;
  params: PossibleModalParams;
}

export interface UIStateQuery_uiState_activeAlert_buttons {
  text: string;
  onPress?: () => void;
  type: ModalButtonTypes;
}

export interface UIStateQuery_uiState_activeAlert {
  title: string;
  message: string;
  buttons?: UIStateQuery_uiState_activeAlert_buttons[];
  cancelButton?: UIStateQuery_uiState_activeAlert_buttons;
}

export interface UIStateQuery_uiState {
  activeModal: UIStateQuery_uiState_activeModal;
  activeAlert: UIStateQuery_uiState_activeAlert | null;
  isLoading: boolean;
}

export interface UIStateQuery {
  uiState: UIStateQuery_uiState;
}
