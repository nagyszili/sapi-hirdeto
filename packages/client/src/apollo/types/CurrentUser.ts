/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_currentUser_favorites_location {
  __typename: "Location";
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

export interface CurrentUser_currentUser_favorites_attributeValues {
  __typename: "AttributeValue";
  key: string;
  value: string;
}

export interface CurrentUser_currentUser_favorites {
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
  location: CurrentUser_currentUser_favorites_location;
  views: number;
  attributeValues: CurrentUser_currentUser_favorites_attributeValues[] | null;
}

export interface CurrentUser_currentUser {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  role: string;
  favorites: CurrentUser_currentUser_favorites[] | null;
}

export interface CurrentUser {
  currentUser: CurrentUser_currentUser;
}
