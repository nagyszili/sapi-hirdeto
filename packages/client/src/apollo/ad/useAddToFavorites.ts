import { gql, useMutation, ApolloError } from '@apollo/client';
import React from 'react';

import {
  AddToFavorites,
  AddToFavoritesVariables,
} from '../types/AddToFavorites';
import { showLoginModal } from '../ui/modalMutations';

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($adId: String!) {
    addAdToFavorites(adId: $adId) {
      id
      favorites
    }
  }
`;

export const useAddToFavorites = (
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>
) =>
  useMutation<AddToFavorites, AddToFavoritesVariables>(ADD_TO_FAVORITES, {
    onError: (error: ApolloError) => {
      if (error.graphQLErrors[0]?.extensions?.exception.status === 401) {
        showLoginModal();
      } else {
        alert('Something went wrong!');
      }
      setFavorite((oldValue) => !oldValue);
    },
    refetchQueries: ['FavoriteAds'],
  });
