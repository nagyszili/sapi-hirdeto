/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdsByUser
// ====================================================

export interface AdsByUser_findAdsByUser_user {
  __typename: "User";
  id: string;
}

export interface AdsByUser_findAdsByUser_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface AdsByUser_findAdsByUser {
  __typename: "AdListItem";
  id: string;
  identifier: string;
  name: string;
  price: number;
  currency: string;
  negotiable: boolean;
  status: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  thumbnail: string | null;
  numberOfImages: number;
  user: AdsByUser_findAdsByUser_user;
  location: AdsByUser_findAdsByUser_location;
}

export interface AdsByUser {
  findAdsByUser: AdsByUser_findAdsByUser[];
}

export interface AdsByUserVariables {
  page?: number | null;
  perPage?: number | null;
}
