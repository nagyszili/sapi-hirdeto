/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdsByUser
// ====================================================

export interface AdsByUser_findAdsByUser_location {
  __typename: "Location";
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

export interface AdsByUser_findAdsByUser_attributeValues {
  __typename: "AttributeValue";
  key: string;
  value: string;
}

export interface AdsByUser_findAdsByUser {
  __typename: "Ad";
  id: string;
  identifier: string;
  name: string;
  price: number;
  currency: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  thumbnail: string | null;
  numberOfImages: number;
  location: AdsByUser_findAdsByUser_location;
  views: number;
  attributeValues: AdsByUser_findAdsByUser_attributeValues[] | null;
}

export interface AdsByUser {
  findAdsByUser: AdsByUser_findAdsByUser[];
}

export interface AdsByUserVariables {
  page?: number | null;
  perPage?: number | null;
}
