/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CategoriesByMainCategoryIdentifier
// ====================================================

export interface CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes_possibleValues {
  __typename: "PossibleValues";
  dependingKey: string | null;
  values: string[];
}

export interface CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes {
  __typename: "Attribute";
  title: string;
  type: string;
  possibleValues: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes_possibleValues[];
  dependsBy: string | null;
  required: boolean;
}

export interface CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_mainCategory {
  __typename: "MainCategory";
  identifier: string;
  name: string;
}

export interface CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier {
  __typename: "Category";
  id: string;
  name: string;
  identifier: string;
  attributes: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes[];
  mainCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_mainCategory;
}

export interface CategoriesByMainCategoryIdentifier {
  findCategoriesByMainCategoryIdentifier: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
}

export interface CategoriesByMainCategoryIdentifierVariables {
  identifier: string;
}
