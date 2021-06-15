import { useReactiveVar } from '@apollo/client';
import { useScrollToTop } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { listTypeVar } from '../../../../apollo/reactiveVariables';
import { ListTypeEnum } from '../../../../apollo/types';
import { AllAds_findAllAds } from '../../../../apollo/types/AllAds';
import { greyLightColor } from '../../../../utils/theme/colors';
import { AdGalleryItem } from '../AdGalleryItem';
import { AdGridItem } from '../AdGridItem';
import { AdListItem } from '../AdListItem';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  refetch,
  fetchMore,
  loading,
  user,
  ListHeaderComponent,
  ListEmptyComponent,
  listType,
}) => {
  const listLayoutType = useReactiveVar(listTypeVar);

  const renderItem = ({
    item,
    index,
  }: {
    item: AllAds_findAllAds;
    index: number;
  }) => {
    return listType === ListTypeEnum.grid ||
      (!listType && listLayoutType === ListTypeEnum.grid) ? (
      <AdGridItem
        item={item}
        index={index}
        user={user}
        hideAdToFavorite={user?.id === item.user.id}
      />
    ) : listType === ListTypeEnum.list ||
      (!listType && listLayoutType === ListTypeEnum.list) ? (
      <AdListItem
        item={item}
        user={user}
        hideAdToFavorite={user?.id === item.user.id}
      />
    ) : (
      <AdGalleryItem
        item={item}
        user={user}
        hideAdToFavorite={user?.id === item.user.id}
      />
    );
  };

  const ref = React.useRef(null);

  useScrollToTop(ref);

  const getNumOfColumns = (): number => {
    if (listType === ListTypeEnum.grid) {
      return 2;
    }
    if (listType === ListTypeEnum.list || listType === ListTypeEnum.gallery) {
      return 1;
    }
    if (listLayoutType === ListTypeEnum.grid) {
      return 2;
    }
    return 1;
  };

  return (
    <View style={styles.container}>
      <FlatList
        key={listType || listLayoutType}
        ref={ref}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollsToTop
        data={ads}
        numColumns={getNumOfColumns()}
        renderItem={renderItem}
        onEndReached={() => fetchMore && fetchMore()}
        onEndReachedThreshold={0.5}
        refreshing={loading}
        onRefresh={() => refetch && refetch()}
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
