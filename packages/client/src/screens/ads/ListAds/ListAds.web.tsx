import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import texts from '../../../../assets/texts/texts.json';
import { AllAds_findAllAds } from '../../../apollo/types/AllAds';
import { Text } from '../../../components/themed/Text';
import { maxContentWidth } from '../../../utils/theme/layout';
import { AdListItem } from './AdListItem/AdListItem';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  loading,
  user,
  numberOfAds,
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

  const nrAds = Math.floor(numberOfAds / 10) * 10;

  return (
    <View style={styles.container}>
      {nrAds === 0 ? (
        <Text style={styles.numberAds} extraSmall greyDark>
          {numberOfAds} {texts['result']}
        </Text>
      ) : (
        <Text style={styles.numberAds} extraSmall greyDark>
          {texts['moreThen']} {nrAds} {texts['result']}
        </Text>
      )}
      <FlatList
        data={ads}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        extraData={user}
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
