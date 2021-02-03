import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useCategoriesByMainCategoryId } from '../../apollo/category/useCategoriesByMainCategoryId';
import { useAllMainCategories } from '../../apollo/main-category/useAllMainCategories';
import { Filter } from '../../apollo/types/graphql-global-types';
import { AdsScreenRouteProp } from '../../navigation/types';
import { AdsScreenComponent } from './AdsScreenComponent';

export const AdsScreen: React.FC<{}> = () => {
  const { data: mainCategories } = useAllMainCategories();
  const route = useRoute<AdsScreenRouteProp>();
  const [mainCategory, setMainCategory] = useState(
    route.params.mainCategoryId || '',
  );
  const [queryString, setQueryString] = useState(
    route.params.queryString || '',
  );
  const [searchInDescription, setSearchInDescription] = useState(
    route.params.searchInDescription || false,
  );
  const [category, setCategory] = useState(route.params.categoryId || '');
  const prevMainCategory = usePrevious(mainCategory);
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect(() => {
    if (mainCategory !== prevMainCategory && prevMainCategory !== undefined) {
      setCategory('');
    }
  }, [mainCategory]);

  useEffect(() => {
    setFilters([]);
  }, [category]);

  const { data: categories } = useCategoriesByMainCategoryId(mainCategory);

  const getSelectedCategory = () =>
    categories?.findCategoriesByMainCategoryId.find(
      (cat) => cat.id === category,
    );

  return (
    <AdsScreenComponent
      search={setQueryString}
      searchString={queryString}
      searchInDescription={searchInDescription}
      setSearchInDescription={setSearchInDescription}
      mainCategories={mainCategories?.findAllMainCategories}
      selectedMainCategory={mainCategory}
      setSelectedMainCategory={setMainCategory}
      categories={categories?.findCategoriesByMainCategoryId}
      selectedCategory={getSelectedCategory()}
      setSelectedCategory={setCategory}
      filters={filters}
      setFilters={setFilters}
    />
  );
};

const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
