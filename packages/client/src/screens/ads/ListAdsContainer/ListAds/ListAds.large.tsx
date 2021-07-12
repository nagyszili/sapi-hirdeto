import { useScrollToTop } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import texts from '../../../../../assets/texts/texts.json';
import { AllAds_findAllAds } from '../../../../apollo/types/AllAds';
import { PaginationComponent } from '../../../../components/PaginationComponent.web';
import { Text } from '../../../../components/themed/Text';
import { hideAddToFavorite } from '../../../../utils';
import { maxContentWidth, globalPadding } from '../../../../utils/theme/layout';
import { AdListItem } from '../AdListItem';
import { ListAdsProps } from './ListAds.props';

export const ListAds: React.FC<ListAdsProps> = ({
  ads,
  loading,
  user,
  numberOfAds,
  refetch,
  adsPerPage,
  page,
  ListEmptyComponent,
}) => {
  const renderItem = ({ item }: { item: AllAds_findAllAds }) => {
    return (
      <AdListItem
        item={item}
        user={user}
        hideAdToFavorite={hideAddToFavorite(item, user)}
      />
    );
  };

  const roundedNrAds = numberOfAds && Math.floor(numberOfAds / 10) * 10;

  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      {!!numberOfAds && !!roundedNrAds && roundedNrAds > 0 ? (
        <Text style={styles.numberAds} extraSmall greyDark>
          {texts['moreThen']} {roundedNrAds} {texts['result']}
        </Text>
      ) : !!numberOfAds && numberOfAds > 0 ? (
        <Text style={styles.numberAds} extraSmall greyDark>
          {numberOfAds} {texts['result']}
        </Text>
      ) : null}
      <FlatList
        data={ads}
        ListEmptyComponent={ListEmptyComponent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={loading}
        keyExtractor={(item) => item.id}
        extraData={user}
        scrollsToTop
      />

      {refetch && !!numberOfAds && numberOfAds > 0 && (
        <View style={styles.paginationContainer}>
          <PaginationComponent
            numberOfAds={numberOfAds || 0}
            refetch={refetch}
            page={page}
            adsPerPage={adsPerPage}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    width: '100%',
  },
  numberAds: {
    marginLeft: 20,
    marginBottom: 6,
  },
  paginationContainer: {
    marginTop: 32,
    marginBottom: 16,
  },
});
