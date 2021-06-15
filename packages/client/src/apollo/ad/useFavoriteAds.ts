import { gql, useQuery } from '@apollo/client';

import { FavoriteAds } from '../types/FavoriteAds';

export const FAVORITE_ADS = gql`
  query FavoriteAds {
    findFavoriteAdsByUser {
      id
      identifier
      name
      price
      negotiable
      currency
      description
      createdAt
      updatedAt
      thumbnail
      numberOfImages
      user {
        id
      }
      location {
        name
        county
      }
    }
  }
`;

export const useFavoriteAds = () => useQuery<FavoriteAds>(FAVORITE_ADS);
