import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { initialSortType } from '../../../apollo/initialValues';
import { ListTypeEnum } from '../../../apollo/types';
import { MainCategoryContainer } from '../../../components/MainCategoryContainer';
import { SearchBarComponent } from '../../../components/SearchBar';
import { CURRENCY } from '../../../utils/constants';
import { whiteColor } from '../../../utils/theme/colors';
import { ListAdsContainer } from '../../ads/ListAdsContainer/ListAdsContainer';
import { HomeComponentProps } from './HomeComponent.props';

export const HomeComponent: React.FC<HomeComponentProps> = ({
  mainCategories,
  creatorId,
}) => {
  const navigation = useNavigation();

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.navigate('AdsScreen', {
      mainCategoryIdentifier,
    });

  const search = (queryString: string) => {
    navigation.navigate('AdsScreen', {
      query: queryString || undefined,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBarComponent search={search} />
      </View>

      <View style={styles.list}>
        <ListAdsContainer
          currency={CURRENCY.LEI}
          sort={initialSortType}
          listType={ListTypeEnum.grid}
          creatorId={creatorId}
          ListHeaderComponent={
            <View style={styles.categories}>
              <MainCategoryContainer
                mainCategories={mainCategories}
                setMainCategoryIdentifier={setMainCategoryIdentifier}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
    flex: 1,
  },
  searchBar: {
    padding: 8,
    width: '100%',
  },
  categories: {
    width: '100%',
    backgroundColor: whiteColor,
  },
});
