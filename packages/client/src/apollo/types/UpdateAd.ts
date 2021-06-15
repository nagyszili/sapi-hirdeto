/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageUpdate, LocationInput, AttributeValueInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: UpdateAd
// ====================================================

export interface UpdateAd_updateAd_user {
  __typename: "User";
  id: string;
}

export interface UpdateAd_updateAd_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface UpdateAd_updateAd {
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
  user: UpdateAd_updateAd_user;
  location: UpdateAd_updateAd_location;
}

export interface UpdateAd {
  updateAd: UpdateAd_updateAd;
}

export interface UpdateAdVariables {
  id: string;
  name: string;
  price: number;
  currency: string;
  negotiable: boolean;
  description: string;
  images?: ImageUpdate[] | null;
  location: LocationInput;
  categoryId: string;
  attributeValues?: AttributeValueInput[] | null;
  deletedImages?: string[] | null;
  thumbnail?: ImageUpdate | null;
}
