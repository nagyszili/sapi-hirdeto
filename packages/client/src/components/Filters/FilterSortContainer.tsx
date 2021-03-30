import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import attributeLabels from '../../../assets/texts/attributes.json';
import texts from '../../../assets/texts/texts.json';
import { useActiveCurrency } from '../../apollo/filters/useActiveCurrency';
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
  const { data: currency } = useActiveCurrency();

  return (
    <View style={styles.container}>
      <View style={styles.searchInDescription}>
        <CheckBoxComponent
          title={texts['searchInDescription']}
          selected={searchInDescription}
          onSelect={() => setSearchInDescription(!searchInDescription)}
        />
      </View>

      <View style={styles.filters}>
        {mainCategories && setSelectedMainCategory && (
          <View style={{ zIndex: 100 }}>
            <CategoryFilter
              label={texts['mainCategory']}
              style={styles.elementMargin}
              categories={mainCategories}
              selectedCategory={selectedMainCategory}
              setSelectedCategory={setSelectedMainCategory}
            />
          </View>
        )}
        {categories && categories.length > 0 && setSelectedCategory && (
          <View key={selectedMainCategory} style={{ zIndex: 99 }}>
            <CategoryFilter
              label={texts['category']}
              style={styles.elementMargin}
              categories={categories}
              selectedCategory={selectedCategory?.identifier}
              setSelectedCategory={setSelectedCategory}
            />
          </View>
        )}

        <View style={styles.elementMargin}>
          <RangeFilter
            title="price"
            label={`${attributeLabels['price']} (${
              texts[currency!.currency as keyof typeof texts]
            })`}
            filters={filters}
          />
        </View>

        <View style={styles.elementMargin}>
          <CurrencyPicker />
        </View>

        {selectedCategory && (
          <View style={{ zIndex: 98 }}>
            <FiltersContainer
              key={selectedCategory.id}
              filters={filters}
              selectedCategory={selectedCategory}
            />
          </View>
        )}
        <View style={[styles.elementMargin, { zIndex: 97 }]}>
          <SortComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: maxContentWidth,
    marginBottom: 45,
    zIndex: 100,
  },
  filters: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryFilter: {
    marginRight: 16,
    marginVertical: 8,
  },
  searchInDescription: {
    marginBottom: 36,
    marginLeft: 22,
  },
  priceFilter: {
    marginRight: 16,
    marginVertical: 8,
  },
  elementMargin: {
    width: 270,
    marginRight: 16,
    marginVertical: 8,
  },
});
