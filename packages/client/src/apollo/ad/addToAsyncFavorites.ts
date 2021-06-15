import asyncStorage from '@react-native-async-storage/async-storage';

import { asyncFavoritesVar } from '../reactiveVariables';

export const addToAsyncFavorites = async (adId: string) => {
  asyncFavoritesVar(
    asyncFavoritesVar().some((fav) => fav === adId)
      ? asyncFavoritesVar().filter((fav) => fav !== adId)
      : [...asyncFavoritesVar(), adId]
  );

  let favorites: string[] = [];
  const favoritesString = await asyncStorage.getItem('favorites');

  if (favoritesString) {
    favorites = JSON.parse(favoritesString);
  }

  if (favorites.find((fav) => fav === adId)) {
    favorites = favorites.filter((favorite) => favorite !== adId);
  } else {
    favorites.push(adId);
  }
  await asyncStorage.setItem('favorites', JSON.stringify(favorites));
};
