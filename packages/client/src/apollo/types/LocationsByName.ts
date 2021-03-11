/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationsByName
// ====================================================

export interface LocationsByName_findLocationsByName {
  __typename: "Location";
  name: string;
  county: string;
  longitude: number;
  latitude: number;
}

export interface LocationsByName {
  findLocationsByName: LocationsByName_findLocationsByName[];
}

export interface LocationsByNameVariables {
  name: string;
}
