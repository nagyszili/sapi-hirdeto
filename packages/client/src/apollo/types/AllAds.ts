/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationInput, Filter } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: AllAds
// ====================================================

export interface AllAds_findAllAds_user_favorites {
  __typename: "Ad";
  id: string;
}

export interface AllAds_findAllAds_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  favorites: AllAds_findAllAds_user_favorites[] | null;
}

export interface AllAds_findAllAds_location {
  __typename: "Location";
  name: string | null;
  county: string;
}

export interface AllAds_findAllAds_category_attributes {
  __typename: "Attribute";
  title: string;
  type: string;
  possibleValues: string[];
}

export interface AllAds_findAllAds_category_mainCategory {
  __typename: "MainCategory";
  id: string;
  identifier: string;
  name: string;
}

export interface AllAds_findAllAds_category {
  __typename: "Category";
  id: string;
  identifier: string;
  name: string;
  attributes: AllAds_findAllAds_category_attributes[];
  mainCategory: AllAds_findAllAds_category_mainCategory;
}

export interface AllAds_findAllAds_attributeValues {
  __typename: "AttributeValue";
  key: string;
  value: string;
}

export interface AllAds_findAllAds {
  __typename: "Ad";
  id: string;
  identifier: string;
  name: string;
  currency: string;
  user: AllAds_findAllAds_user;
  price: number;
  description: string | null;
  images: string[] | null;
  createdAt: any;
  updatedAt: any | null;
  location: AllAds_findAllAds_location;
  views: number;
  category: AllAds_findAllAds_category;
  attributeValues: AllAds_findAllAds_attributeValues[] | null;
}

export interface AllAds {
  findAllAds: AllAds_findAllAds[];
}

export interface AllAdsVariables {
  page?: number | null;
  perPage?: number | null;
  sortField?: string | null;
  sortOrder?: string | null;
  queryString?: string | null;
  mainCategoryId?: string | null;
  categoryId?: string | null;
  inDescription?: boolean | null;
  location?: LocationInput | null;
  currency: string;
  filters?: Filter[] | null;
}
