import { useRoute, useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { useCategoriesByMainCategoryIdentifier } from '../../apollo/category/useCategoriesByMainCategoryIdentifier';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { AdsScreenRouteProp } from '../../navigation/types';
import { AdsScreenComponent } from './AdsScreenComponent';

export const AdsScreen: React.FC<{}> = () => {
  const navigation = useNavigation();
  const { data: mainCategories } = useAllMainCategories();
  const route = useRoute<AdsScreenRouteProp>();

  const setQueryString = (queryString: string) =>
    navigation.setParams({ query: queryString || undefined });

  const setMainCategoryIdentifier = (mainCategoryIdentifier: string) =>
    navigation.setParams({
      mainCategoryIdentifier,
      categoryIdentifier: '',
      filters: undefined,
    });

  const setCategoryIdentifier = (categoryIdentifier: string) =>
    navigation.setParams({ categoryIdentifier, filters: undefined });

  const setSearchInDescription = (inDescription: boolean) =>
    navigation.setParams({ inDescription: inDescription || undefined });

  const { data: categories } = useCategoriesByMainCategoryIdentifier(
    route?.params?.mainCategoryIdentifier || '',
  );

  const getSelectedCategory = () =>
    categories?.findCategoriesByMainCategoryIdentifier.find(
      (cat) => cat.identifier === route?.params?.categoryIdentifier,
    );

  return (
    <AdsScreenComponent
      search={setQueryString}
      searchString={route?.params?.query || undefined}
      searchInDescription={route?.params?.inDescription || false}
      setSearchInDescription={setSearchInDescription}
      mainCategories={mainCategories?.findAllMainCategories}
      selectedMainCategory={route?.params?.mainCategoryIdentifier || ''}
      setSelectedMainCategory={setMainCategoryIdentifier}
      categories={categories?.findCategoriesByMainCategoryIdentifier}
      selectedCategory={getSelectedCategory()}
      setSelectedCategory={setCategoryIdentifier}
      filters={route?.params?.filters || undefined}
    />
  );
};
