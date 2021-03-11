import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { AllAds_findAllAds } from '../../apollo/types/AllAds';
import { greyLightColor } from '../../utils/theme/colors';
import { AdListItem } from './AdListItem/AdListItem';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  numberOfAds,
  ads,
  refetch,
  fetchMore,
  loading,
  user,
}) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: AllAds_findAllAds;
    index: number;
  }) => (
    <AdListItem
      item={item}
      index={index}
      favorite={!!user?.favorites?.find((favorite) => favorite.id === item.id)}
    />
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={() => {
          fetchMore();
        }}
        onEndReachedThreshold={1}
        refreshing={loading}
        onRefresh={() => {
          refetch();
        }}
        keyExtractor={(item) => item.id}
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
