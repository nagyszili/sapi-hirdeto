/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UIStateQuery
// ====================================================

export interface UIStateQuery_uiState_activeModal {
  __typename: "Modal";
  name: string;
  params: any | null;
}

export interface UIStateQuery_uiState_activeAlert_buttons {
  __typename: "AlertButton";
  text: string;
  onPress: any | null;
  type: string;
}

export interface UIStateQuery_uiState_activeAlert {
  __typename: "Alert";
  title: string;
  message: string;
  buttons: (UIStateQuery_uiState_activeAlert_buttons | null)[] | null;
}

export interface UIStateQuery_uiState {
  __typename: "UIState";
  activeModal: UIStateQuery_uiState_activeModal;
  activeAlert: UIStateQuery_uiState_activeAlert | null;
  isLoading: boolean;
}

export interface UIStateQuery {
  uiState: UIStateQuery_uiState;
}
