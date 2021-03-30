import * as React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import { FilterSortContainer } from '../../components/Filters/FilterSortContainer';
import { Footer } from '../../components/Footer/Footer';
import { SearchBarComponent } from '../../components/SearchBar/SearchBarComponent';
import { greyLightColor } from '../../utils/theme/colors';
import { AdsComponentProps } from './AdsComponent.props';
import { ListAdsContainer } from './ListAds/ListAdsContainer';

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
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <SearchBarComponent search={search} searchString={searchString} />
          <FilterSortContainer
            searchInDescription={searchInDescription}
            setSearchInDescription={setSearchInDescription}
            mainCategories={mainCategories}
            selectedMainCategory={selectedMainCategory}
            setSelectedMainCategory={setSelectedMainCategory}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filters={filters}
          />
          <ListAdsContainer
            filters={filters}
            queryString={searchString}
            categoryIdentifier={selectedCategory?.identifier}
            mainCategoryIdentifier={selectedMainCategory}
            searchInDescription={searchInDescription}
          />
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: greyLightColor,
  },
  scroll: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    marginBottom: 46,
  },
});
