import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { LocationQueryInput } from '../../apollo/types/graphql-global-types';
import { AdsScreenRouteProp } from '../../navigation/types';
import { AdsScreenComponent } from './AdsScreenComponent';

export const AdsScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: mainCategories } = useAllMainCategories();
  const route = useRoute<AdsScreenRouteProp>();

  const getFilters = () => {
    const filters = route?.params?.filters?.filter(
      (filter) => filter.name === 'price'
    );
    if (filters && filters.length > 0) {
      return filters;
    }
    return undefined;
  };

  const setLocation = (location?: LocationQueryInput | null) => {
    navigation.setParams({ location });
  };

  const setQueryString = (queryString: string) => {
    navigation.setParams({ query: queryString || undefined });
  };

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.setParams({
      mainCategoryIdentifier,
      categoryIdentifier: '',
      filters: getFilters(),
    });

  const setCategoryIdentifier = (categoryIdentifier: string) =>
    navigation.setParams({
      categoryIdentifier,
      filters: getFilters(),
    });

  const setSearchInDescription = (inDescription: boolean) =>
    navigation.setParams({ inDescription: inDescription || undefined });

  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    route?.params?.mainCategoryIdentifier || ''
  );

  const getSelectedCategory = () =>
    categories?.findCategoriesByMainCategoryIdentifier.find(
      (cat) => cat.identifier === route?.params?.categoryIdentifier
    );

  return (
    <AdsScreenComponent
      search={setQueryString}
      searchString={route?.params?.query || undefined}
      searchInDescription={route?.params?.inDescription || false}
      setSearchInDescription={setSearchInDescription}
      mainCategories={mainCategories?.findAllMainCategories}
      selectedMainCategory={route?.params?.mainCategoryIdentifier || undefined}
      setSelectedMainCategory={setMainCategoryIdentifier}
      categories={categories?.findCategoriesByMainCategoryIdentifier}
      selectedCategory={getSelectedCategory()}
      setSelectedCategory={setCategoryIdentifier}
      setLocation={setLocation}
      creatorId={route?.params?.creatorId}
      location={route?.params?.location || undefined}
      filters={route?.params?.filters || undefined}
    />
  );
};
