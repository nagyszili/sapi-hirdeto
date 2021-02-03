/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoriesByMainCategoryId
// ====================================================

export interface CategoriesByMainCategoryId_findCategoriesByMainCategoryId_attributes {
  __typename: "Attribute";
  title: string;
  type: string;
  possibleValues: string[];
}

export interface CategoriesByMainCategoryId_findCategoriesByMainCategoryId_mainCategory {
  __typename: "MainCategory";
  id: string;
  identifier: string;
  name: string;
}

export interface CategoriesByMainCategoryId_findCategoriesByMainCategoryId {
  __typename: "Category";
  id: string;
  name: string;
  identifier: string;
  attributes: CategoriesByMainCategoryId_findCategoriesByMainCategoryId_attributes[];
  mainCategory: CategoriesByMainCategoryId_findCategoriesByMainCategoryId_mainCategory;
}

export interface CategoriesByMainCategoryId {
  findCategoriesByMainCategoryId: CategoriesByMainCategoryId_findCategoriesByMainCategoryId[];
}

export interface CategoriesByMainCategoryIdVariables {
  id: string;
}
