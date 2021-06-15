import * as React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import { FilterSortContainer } from '../../../components/Filters/FilterSortContainer.web';
import { Footer } from '../../../components/Footer/Footer.web';
import { GradientHeader } from '../../../components/Headers/GradientHeader.web';
import { SearchBarComponent } from '../../../components/SearchBar';
import { useScrollToTop } from '../../../hooks/useScrollToTop';
import { greyLightColor } from '../../../utils/theme/colors';
import { ListAdsContainer } from '../ListAdsContainer/ListAdsContainer';
import { AdsScreenComponentProps } from './AdsScreenComponent.props';

export const AdsScreenComponent: React.FC<AdsScreenComponentProps> = ({
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
  setLocation,
  creatorId,
  location,
}) => {
  const { scrollRef, scrollToTop } = useScrollToTop();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef} style={styles.scroll}>
        <GradientHeader />

        <View style={styles.content}>
          <SearchBarComponent
            search={search}
            searchString={searchString}
            setLocation={setLocation}
            location={location}
          />
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
            location={location}
            creatorId={creatorId}
            scrollToTop={scrollToTop}
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
    width: '100%',
    minHeight: '90%',
    alignItems: 'center',
    marginBottom: 46,
  },
});
