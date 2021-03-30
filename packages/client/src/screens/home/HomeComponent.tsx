import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { MainCategoryContainer } from '../../components/MainCategories/MainCategoryContainer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { whiteColor } from '../../utils/theme/colors';
import { ListAdsContainer } from '../ads/ListAds/ListAdsContainer';

interface Props {
  mainCategories: AllMainCategories_findAllMainCategories[];
}

export const HomeComponent: React.FC<Props> = ({ mainCategories }) => {
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
    margin: 8,
  },
  categories: {
    width: '100%',
    backgroundColor: whiteColor,
  },
});
