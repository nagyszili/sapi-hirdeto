/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdsByIds
// ====================================================

export interface AdsByIds_findAdsByIds_user {
  __typename: "User";
  id: string;
}

export interface AdsByIds_findAdsByIds_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface AdsByIds_findAdsByIds {
  __typename: "AdListItem";
  id: string;
  identifier: string;
  name: string;
  price: number;
  negotiable: boolean;
  currency: string;
  status: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  thumbnail: string | null;
  numberOfImages: number;
  user: AdsByIds_findAdsByIds_user;
  location: AdsByIds_findAdsByIds_location;
}

export interface AdsByIds {
  findAdsByIds: AdsByIds_findAdsByIds[];
}

export interface AdsByIdsVariables {
  ids: string[];
}
