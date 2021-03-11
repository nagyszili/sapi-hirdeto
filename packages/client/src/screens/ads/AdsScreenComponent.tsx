import * as React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import { ListAdsContainer } from '../../components/ListAds/ListAdsContainer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { AdsComponentProps } from './AdsComponent.props';

export const AdsScreenComponent: React.FC<AdsComponentProps> = ({
  searchString,
  search,
  searchInDescription,
  setSearchInDescription,
  mainCategories,
  selectedMainCategory,
  setSelectedMainCategory,
  categories,
  selectedCategory,
  setSelectedCategory,
  filters,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <SearchBarComponent
            filters={filters}
            search={search}
            searchString={searchString}
            searchInDescription={searchInDescription}
            setSearchInDescription={setSearchInDescription}
            mainCategories={mainCategories}
            selectedMainCategory={selectedMainCategory}
            setSelectedMainCategory={setSelectedMainCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
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
    height: '100%',
    width: '100%',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  searchBar: {
    flex: 0.2,
    width: '100%',
    alignItems: 'center',
  },
  listAds: {
    flex: 1,
    width: '100%',
  },
});
