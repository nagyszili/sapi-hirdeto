/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LocationInput, Filter } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: CountAllAds
// ====================================================

export interface CountAllAds {
  countAllAds: number;
}

export interface CountAllAdsVariables {
  queryString?: string | null;
  mainCategoryIdentifier?: string | null;
  categoryIdentifier?: string | null;
  inDescription?: boolean | null;
  location?: LocationInput | null;
  currency: string;
  filters?: Filter[] | null;
}
