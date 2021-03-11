/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationsByCounty
// ====================================================

export interface LocationsByCounty_findLocationsByCounty {
  __typename: "Location";
  name: string;
  county: string;
  longitude: number;
  latitude: number;
}

export interface LocationsByCounty {
  findLocationsByCounty: LocationsByCounty_findLocationsByCounty[];
}

export interface LocationsByCountyVariables {
  county: string;
}
