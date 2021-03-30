import * as React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { AdsComponentProps } from './AdsComponent.props';
import { ListAdsContainer } from './ListAds/ListAdsContainer';

export const AdsScreenComponent: React.FC<AdsComponentProps> = ({
  searchString,
  search,
  searchInDescription,
  selectedMainCategory,
  selectedCategory,
  filters,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <SearchBarComponent search={search} searchString={searchString} />
        </View>
        <View style={styles.listAds}>
          <ListAdsContainer
            filters={filters}
            queryString={searchString}
            categoryIdentifier={selectedCategory?.identifier}
            mainCategoryIdentifier={selectedMainCategory}
            searchInDescription={searchInDescription}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    padding: 8,
  },
  listAds: {
    flex: 1,
    width: '100%',
  },
});
