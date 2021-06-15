/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToFavorites
// ====================================================

export interface AddToFavorites_addAdToFavorites {
  __typename: "UserAdsList";
  id: string;
  favorites: string[] | null;
}

export interface AddToFavorites {
  addAdToFavorites: AddToFavorites_addAdToFavorites;
}

export interface AddToFavoritesVariables {
  adId: string;
}
