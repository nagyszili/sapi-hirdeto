import * as React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

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
  setFilters,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <SearchBarComponent
            filters={filters}
            setFilters={setFilters}
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
          <ListAdsContainer
            filters={filters || []}
            queryString={searchString}
            categoryId={selectedCategory?.id}
            mainCategoryId={selectedMainCategory}
            searchInDescription={searchInDescription}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scroll: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    padding: 10,
  },
});
