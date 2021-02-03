import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { AllAds_findAllAds } from '../../apollo/types/AllAds';
import { ListAdsProps } from './ListAds.props';

interface ItemType {
  item: AllAds_findAllAds;
}

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  refetch,
  fetchMore,
  loading,
}) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  const renderItem = ({ item }: ItemType) => <Item item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
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

const Item = ({ item }: ItemType) => (
  <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
    <View style={styles.item}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}>{item.category.mainCategory.identifier}</Text>
      <Text style={styles.title}>{item.category.identifier}</Text>
      <Text style={styles.title}>{item.description}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'stretch',
  },
  item: {
    margin: 10,
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 16,
  },
});
