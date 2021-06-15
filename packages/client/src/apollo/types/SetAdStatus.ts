/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetAdStatus
// ====================================================

export interface SetAdStatus_setAdStatus {
  __typename: "Ad";
  id: string;
  status: string;
}

export interface SetAdStatus {
  setAdStatus: SetAdStatus_setAdStatus;
}

export interface SetAdStatusVariables {
  id: string;
  status: string;
  reasonOfDelete?: string | null;
}
