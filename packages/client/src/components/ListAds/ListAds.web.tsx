import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { AllAds_findAllAds } from '../../apollo/types/AllAds';
import { PaginationComponent } from '../PaginationComponent.web';
import { ListAdsProps } from './ListAds.props';

interface ItemType {
  item: AllAds_findAllAds;
}

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  refetch,
  loading,
  numberOfAds,
  page,
  adsPerPage,
}) => {
  if (!ads || ads.length === 0) {
    return null;
  }
  const renderItem = ({ item }: ItemType) => <Item item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={ads}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item) => item.id}
      />
      <PaginationComponent
        numberOfAds={numberOfAds}
        refetch={refetch}
        page={page}
        adsPerPage={adsPerPage}
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
      <Text style={styles.title}>{item.price}</Text>
      <Text style={styles.title}>{item.currency}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  list: {
    padding: 10,
    margin: 10,
  },
  item: {
    margin: 10,
    height: 200,
    width: 650,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 16,
  },
});
