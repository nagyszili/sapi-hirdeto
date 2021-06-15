/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationQueryInput, Filter } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: AllAds
// ====================================================

export interface AllAds_findAllAds_user {
  __typename: "User";
  id: string;
}

export interface AllAds_findAllAds_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface AllAds_findAllAds {
  __typename: "AdListItem";
  id: string;
  identifier: string;
  name: string;
  price: number;
  negotiable: boolean;
  status: string;
  currency: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  thumbnail: string | null;
  numberOfImages: number;
  user: AllAds_findAllAds_user;
  location: AllAds_findAllAds_location;
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
  location?: LocationQueryInput | null;
  currency: string;
  creatorId?: string | null;
  filters?: Filter[] | null;
}
