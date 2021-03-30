import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { AllAds_findAllAds } from '../../../apollo/types/AllAds';
import { greyLightColor } from '../../../utils/theme/colors';
import { AdListItem } from './AdListItem/AdListItem';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  numberOfAds,
  ads,
  refetch,
  fetchMore,
  loading,
  user,
  ListHeaderComponent,
}) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: AllAds_findAllAds;
    index: number;
  }) => {
    return <AdListItem item={item} index={index} user={user} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={ads}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={() => fetchMore()}
        onEndReachedThreshold={3}
        refreshing={loading}
        onRefresh={() => refetch()}
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
    width: '100%',
    backgroundColor: greyLightColor,
  },
});
