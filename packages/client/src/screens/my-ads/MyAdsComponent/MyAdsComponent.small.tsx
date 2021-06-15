import * as React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import { AdsByUser_findAdsByUser } from '../../../apollo/types/AdsByUser';
import { greyLightColor } from '../../../utils/theme/colors';
import { AdGalleryItem } from '../../ads/ListAdsContainer/AdGalleryItem';
import { MyAdsComponentProps } from './MyAdsComponent.props';

export const MyAdsComponent: React.FC<MyAdsComponentProps> = ({
  user,
  ads,
  fetchMoreAds,
}) => {
  const renderItem = ({ item }: { item: AdsByUser_findAdsByUser }) => (
    <AdGalleryItem item={item} user={user} hideAdToFavorite />
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={ads}
        numColumns={1}
        renderItem={renderItem}
        onEndReached={() => fetchMoreAds()}
        onEndReachedThreshold={3}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
        extraData={user}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: greyLightColor,
  },
});
