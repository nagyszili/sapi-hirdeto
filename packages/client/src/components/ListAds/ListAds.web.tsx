import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { AllAds_findAllAds } from '../../apollo/types/AllAds';
import { maxContentWidth } from '../../utils/theme/layout';
import { Text } from '../themed/Text';
import { AdListItem } from './AdListItem/AdListItem.web';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  loading,
  user,
  numberOfAds,
}) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  const nrAds = Math.floor(numberOfAds / 10) * 10;

  const renderItem = ({
    item,
    index,
  }: {
    item: AllAds_findAllAds;
    index: number;
  }) => {
    return (
      <AdListItem
        item={item}
        index={index}
        favorite={
          !!user?.favorites?.find((favorite) => favorite.id === item.id)
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.numberAds} extraSmall greyDark>
        {texts['moreThen']} {nrAds} {texts['result']}
      </Text>
      <FlatList
        data={ads}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: maxContentWidth,
    width: '100%',
  },
  numberAds: {
    marginLeft: 20,
    marginBottom: 6,
  },
});
