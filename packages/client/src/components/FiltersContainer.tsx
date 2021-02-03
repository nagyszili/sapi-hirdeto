import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { CategoriesByMainCategoryId_findCategoriesByMainCategoryId_attributes } from '../apollo/types/CategoriesByMainCategoryId';
import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../utils/constants';
import { CurrencyPicker } from './CurrencyPicker';
import { MultiSelectFilter } from './MultiSelectFilter';
import { RangeFilter } from './RangeFilter';
import { SelectFilter } from './SelectFilter';

interface Props {
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  attributes?: CategoriesByMainCategoryId_findCategoriesByMainCategoryId_attributes[];
}

export const FiltersContainer: React.FC<Props> = ({
  filters,
  setFilters,
  attributes,
}) => {
  console.log('filters', filters);

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {attributes &&
          attributes.map((attribute, key) =>
            attribute.type === ATTRIBUTE_TYPES.RANGE ? (
              <RangeFilter
                key={key}
                filters={filters}
                title={attribute.title}
                setFilters={setFilters}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.MULTI_SELECT ? (
              <MultiSelectFilter
                elements={attribute.possibleValues}
                filters={filters}
                setFilters={setFilters}
                title={attribute.title}
                key={key}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.SELECT ? (
              <SelectFilter
                elements={attribute.possibleValues}
                filters={filters}
                setFilters={setFilters}
                title={attribute.title}
                key={key}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
              <View key={key} />
            ) : null,
          )}
      </View>
      <CurrencyPicker />
      <RangeFilter title="price" filters={filters} setFilters={setFilters} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
  },
  filters: {
    flexDirection: 'row',
  },
});
