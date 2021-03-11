import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';
import { maxContentWidth } from '../../utils/theme/layout';
import { CheckBoxComponent } from '../CheckboxComponent';
import { SortComponent } from '../SortComponent';
import { CategoryFilter } from './CategoryFilter';
import { CurrencyPicker } from './CurrencyPicker';
import { FiltersContainer } from './FiltersContainer';
import { RangeFilter } from './RangeFilter';

interface Props {
  searchInDescription: boolean;
  setSearchInDescription: (searchInDescription: boolean) => void;
  mainCategories?: AllMainCategories_findAllMainCategories[];
  selectedMainCategory?: string;
  setSelectedMainCategory?: (category: string) => void;
  categories?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier[];
  selectedCategory?: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  setSelectedCategory?: (category: string) => void;
  filters?: Filter[];
}

export const FilterSortContainer: React.FC<Props> = ({
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
    <View style={styles.container}>
      {mainCategories && setSelectedMainCategory && (
        <CategoryFilter
          style={styles.categoryFilter}
          categories={mainCategories}
          selectedCategory={selectedMainCategory}
          setSelectedCategory={setSelectedMainCategory}
        />
      )}
      {categories && categories.length > 0 && setSelectedCategory && (
        <CategoryFilter
          style={styles.categoryFilter}
          categories={categories}
          selectedCategory={selectedCategory?.identifier}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <CheckBoxComponent
        title={texts['searchInDescription']}
        selected={searchInDescription}
        onSelect={() => setSearchInDescription(!searchInDescription)}
      />
      <CurrencyPicker />
      <RangeFilter title="price" filters={filters} />
      {selectedCategory && (
        <FiltersContainer
          key={selectedCategory.id}
          filters={filters}
          selectedCategory={selectedCategory}
        />
      )}
      <SortComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: maxContentWidth,
    marginBottom: 25,
  },
  categoryFilter: {
    marginRight: 10,
  },
});
