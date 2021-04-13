/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ImageInput, LocationInput, AttributeValueInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: CreateAd
// ====================================================

export interface CreateAd_createAd {
  __typename: "Ad";
  id: string;
  identifier: string;
  name: string;
}

export interface CreateAd {
  createAd: CreateAd_createAd;
}

export interface CreateAdVariables {
  name: string;
  price: number;
  currency: string;
  description: string;
  images?: ImageInput[] | null;
  location: LocationInput;
  categoryId: string;
  attributeValues?: AttributeValueInput[] | null;
}
