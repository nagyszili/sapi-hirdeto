import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { useCurrentUser } from '../../apollo/user/useCurrentUser';
import { Fetching } from '../../components/Fetching';
import { HeaderContentComponent } from '../../components/Header/HeaderContentComponent';
import { Text } from '../../components/themed/Text';
import { ListFavorites } from './ListFavorites';

export const FavoritesScreen: React.FC<{}> = () => {
  const { data: user, loading } = useCurrentUser();

  if (loading) {
    return <Fetching />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <HeaderContentComponent />
      ) : user.currentUser.favorites?.length !== 0 ? (
        <ListFavorites
          ads={user.currentUser.favorites || []}
          loading
          user={user.currentUser}
        />
      ) : (
        <View style={styles.noFavorite}>
          <Text>Nincs mentett hirdetes</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noFavorite: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
