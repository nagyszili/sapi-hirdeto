import { gql, useMutation, ApolloError } from '@apollo/client';

import {
  AddToFavorites,
  AddToFavoritesVariables,
} from '../types/AddToFavorites';
import { showLoginModal } from '../ui/modalMutations';

export const ADD_TO_FAVORITES = gql`
  mutation AddToFavorites($adId: String!) {
    addAdToFavorites(adId: $adId) {
      id
      favorites {
        id
      }
    }
  }
`;

export const useAddToFavorites = () =>
  useMutation<AddToFavorites, AddToFavoritesVariables>(ADD_TO_FAVORITES, {
    onError: (error: ApolloError) => {
      if (error.graphQLErrors[0]?.extensions?.exception.status === 401) {
        showLoginModal();
      } else {
        alert('Something went wrong!');
      }
    },
  });
