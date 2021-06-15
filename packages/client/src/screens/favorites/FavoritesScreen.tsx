import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { useAdsByIds } from '../../apollo/ad/useAdsByIds';
import { useFavoriteAds } from '../../apollo/ad/useFavoriteAds';
import {
  isLoggedInVar,
  asyncFavoritesVar,
} from '../../apollo/reactiveVariables';
import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { FavoritesComponent } from './FavoritesComponent';

export const FavoritesScreen: React.FC<{}> = () => {
  const asyncFavorites = useReactiveVar(asyncFavoritesVar);

  const { data: user } = useCurrentUser();
  const { data: favoriteAds } = useFavoriteAds();

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: adsByIds } = useAdsByIds({
    ids: asyncFavorites || [],
  });

  return (
    <SafeAreaView style={styles.container}>
      <FavoritesComponent
        loading
        user={user?.currentUser}
        ads={
          isLoggedIn
            ? favoriteAds?.findFavoriteAdsByUser
            : adsByIds?.findAdsByIds
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
