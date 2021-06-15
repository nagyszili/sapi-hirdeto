/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavoriteAds
// ====================================================

export interface FavoriteAds_findFavoriteAdsByUser_user {
  __typename: "User";
  id: string;
}

export interface FavoriteAds_findFavoriteAdsByUser_location {
  __typename: "Location";
  name: string;
  county: string;
}

export interface FavoriteAds_findFavoriteAdsByUser {
  __typename: "AdListItem";
  id: string;
  identifier: string;
  name: string;
  price: number;
  negotiable: boolean;
  currency: string;
  description: string | null;
  createdAt: any;
  updatedAt: any | null;
  thumbnail: string | null;
  numberOfImages: number;
  user: FavoriteAds_findFavoriteAdsByUser_user;
  location: FavoriteAds_findFavoriteAdsByUser_location;
}

export interface FavoriteAds {
  findFavoriteAdsByUser: FavoriteAds_findFavoriteAdsByUser[];
}
