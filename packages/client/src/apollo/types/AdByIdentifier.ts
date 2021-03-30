/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdByIdentifier
// ====================================================

export interface AdByIdentifier_findAdByIdentifier_user {
  __typename: "User";
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
}

export interface AdByIdentifier_findAdByIdentifier_location {
  __typename: "Location";
  longitude: number;
  latitude: number;
  name: string;
  county: string;
}

export interface AdByIdentifier_findAdByIdentifier_category_attributes_possibleValues {
  __typename: "PossibleValues";
  dependingKey: string | null;
  values: string[];
}

export interface AdByIdentifier_findAdByIdentifier_category_attributes {
  __typename: "Attribute";
  title: string;
  type: string;
  possibleValues: AdByIdentifier_findAdByIdentifier_category_attributes_possibleValues[];
  dependsBy: string | null;
}

export interface AdByIdentifier_findAdByIdentifier_category_mainCategory {
  __typename: "MainCategory";
  identifier: string;
  name: string;
}

export interface AdByIdentifier_findAdByIdentifier_category {
  __typename: "Category";
  id: string;
  identifier: string;
  name: string;
  attributes: AdByIdentifier_findAdByIdentifier_category_attributes[];
  mainCategory: AdByIdentifier_findAdByIdentifier_category_mainCategory;
}

export interface AdByIdentifier_findAdByIdentifier_attributeValues {
  __typename: "AttributeValue";
  key: string;
  value: string;
}

export interface AdByIdentifier_findAdByIdentifier {
  __typename: "Ad";
  id: string;
  identifier: string;
  name: string;
  user: AdByIdentifier_findAdByIdentifier_user;
  price: number;
  currency: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  views: number;
  images: string[] | null;
  thumbnail: string | null;
  location: AdByIdentifier_findAdByIdentifier_location;
  category: AdByIdentifier_findAdByIdentifier_category;
  attributeValues: AdByIdentifier_findAdByIdentifier_attributeValues[] | null;
}

export interface AdByIdentifier {
  findAdByIdentifier: AdByIdentifier_findAdByIdentifier;
}

export interface AdByIdentifierVariables {
  identifier: string;
}
