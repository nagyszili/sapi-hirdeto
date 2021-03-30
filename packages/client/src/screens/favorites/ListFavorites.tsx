import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import {
  CurrentUser_currentUser_favorites,
  CurrentUser_currentUser,
} from '../../apollo/types/CurrentUser';
import { AdListItem } from '../ads/ListAds/AdListItem/AdListItem';

interface Props {
  ads: CurrentUser_currentUser_favorites[];
  loading?: boolean;
  user?: CurrentUser_currentUser;
}

export const ListFavorites: React.FC<Props> = ({ ads, loading, user }) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: CurrentUser_currentUser_favorites;
    index: number;
  }) => <AdListItem item={item} index={index} user={user} />;

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={ads}
        numColumns={2}
        renderItem={renderItem}
        // onEndReached={fetchMore}
        onEndReachedThreshold={3}
        refreshing={loading}
        // onRefresh={refetch}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        maxToRenderPerBatch={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
