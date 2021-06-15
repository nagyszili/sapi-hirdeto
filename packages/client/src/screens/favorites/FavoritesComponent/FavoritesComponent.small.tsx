import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { AdsByIds_findAdsByIds } from '../../../apollo/types/AdsByIds';
import { FavoriteAds_findFavoriteAdsByUser } from '../../../apollo/types/FavoriteAds';
import { Text } from '../../../components/themed/Text';
import { AdGalleryItem } from '../../ads/ListAdsContainer/AdGalleryItem';
import { FavoritesComponentProps } from './FavoritesComponent.props';

export const FavoritesComponent: React.FC<FavoritesComponentProps> = ({
  loading,
  user,
  ads,
}) => {
  const renderItem = ({
    item,
  }: {
    item: AdsByIds_findAdsByIds | FavoriteAds_findFavoriteAdsByUser;
  }) => <AdGalleryItem item={item} user={user} />;

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={ads}
        numColumns={1}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        extraData={user}
        ListEmptyComponent={() => (
          <View style={styles.noFavorite}>
            <Text greyMedium large>
              {texts['noFavoriteAds']}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noFavorite: {
    width: '100%',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
