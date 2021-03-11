/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SortQuery
// ====================================================

export interface SortQuery_sortType {
  __typename: "SortType";
  sortField: string | null;
  sortOrder: number | null;
}

export interface SortQuery {
  sortType: SortQuery_sortType;
}
