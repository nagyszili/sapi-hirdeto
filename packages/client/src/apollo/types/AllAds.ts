/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationInput, Filter } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: AllAds
// ====================================================

export interface AllAds_findAllAds_location {
  __typename: "Location";
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

export interface AllAds_findAllAds_attributeValues {
  __typename: "AttributeValue";
  key: string;
  value: string;
}

export interface AllAds_findAllAds {
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
  location: AllAds_findAllAds_location;
  views: number;
  attributeValues: AllAds_findAllAds_attributeValues[] | null;
}

export interface AllAds {
  findAllAds: AllAds_findAllAds[];
}

export interface AllAdsVariables {
  page?: number | null;
  perPage?: number | null;
  sortField?: string | null;
  sortOrder?: number | null;
  queryString?: string | null;
  mainCategoryIdentifier?: string | null;
  categoryIdentifier?: string | null;
  inDescription?: boolean | null;
  location?: LocationInput | null;
  currency: string;
  filters?: Filter[] | null;
}
