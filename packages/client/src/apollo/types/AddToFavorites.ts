/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToFavorites
// ====================================================

export interface AddToFavorites_addAdToFavorites_favorites {
  __typename: "Ad";
  id: string;
}

export interface AddToFavorites_addAdToFavorites {
  __typename: "User";
  id: string;
  favorites: AddToFavorites_addAdToFavorites_favorites[] | null;
}

export interface AddToFavorites {
  addAdToFavorites: AddToFavorites_addAdToFavorites;
}

export interface AddToFavoritesVariables {
  adId: string;
}
