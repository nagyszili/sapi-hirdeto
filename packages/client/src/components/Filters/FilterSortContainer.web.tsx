import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import attributeLabels from '../../../assets/texts/attributes.json';
import texts from '../../../assets/texts/texts.json';
import { currencyVar } from '../../apollo/reactiveVariables';
import { AllMainCategories_findAllMainCategories } from '../../apollo/types/AllMainCategories';
import { CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier } from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';
import * as Color from '../../utils/theme/colors';
import { maxContentWidth, globalPadding } from '../../utils/theme/layout';
import { CheckBoxComponent } from '../CheckboxComponent';
import { SortComponent } from '../Sort/SortComponent';
import { Text } from '../themed/Text';
import { CategoryFilter } from './CategoryFilter';
import { CurrencyPicker } from './CurrencyPicker';
import { FiltersContainer } from './FiltersContainer';
import { RangeFilter } from './Range';

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
  const activeCurrency = useReactiveVar(currencyVar);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CheckBoxComponent
          title={texts['searchInDescription']}
          selected={searchInDescription}
          onSelect={() => setSearchInDescription(!searchInDescription)}
        />

        <View style={{ flexDirection: 'row' }}>
          <CurrencyPicker />

          <SortComponent />
        </View>
      </View>

      <View style={styles.line} />

      <Text style={styles.title} semiBold>
        {texts['filter']}
      </Text>

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
        {setSelectedCategory && (
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
              texts[activeCurrency as keyof typeof texts]
            })`}
            filters={filters}
          />
        </View>

        {selectedCategory && (
          <View style={{ zIndex: 98 }}>
            <FiltersContainer
              key={selectedCategory.id}
              filters={filters}
              selectedCategory={selectedCategory}
              filterStyle={styles.elementMargin}
            />
          </View>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: maxContentWidth,
    paddingHorizontal: globalPadding,
    zIndex: 100,
  },
  title: {
    fontSize: 22,
    color: Color.blackColor,
    marginBottom: 24,
  },
  filters: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 99,
  },
  categoryFilter: {
    marginRight: 16,
    marginVertical: 8,
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
  line: {
    width: '100%',
    height: 1,
    opacity: 0.25,
    backgroundColor: '#979797',
    marginVertical: 24,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 101,
  },
});
