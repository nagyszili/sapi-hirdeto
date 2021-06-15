/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageInput, LocationInput, AttributeValueInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateAd
// ====================================================

export interface CreateAd_createAd_user {
  __typename: "User";
  id: string;
}

export interface CreateAd_createAd_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface CreateAd_createAd {
  __typename: "AdListItem";
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
  user: CreateAd_createAd_user;
  location: CreateAd_createAd_location;
}

export interface CreateAd {
  createAd: CreateAd_createAd;
}

export interface CreateAdVariables {
  name: string;
  price: number;
  currency: string;
  negotiable: boolean;
  description: string;
  images?: ImageInput[] | null;
  thumbnail?: ImageInput | null;
  location: LocationInput;
  categoryId: string;
  attributeValues?: AttributeValueInput[] | null;
}
