import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../../utils/constants';
import { MultiSelectFilter } from './MultiSelectFilter';
import { RangeFilter } from './RangeFilter';
import { SelectFilter } from './SelectFilter';

interface Props {
  filters?: Filter[];
  selectedCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
}

export const FiltersContainer: React.FC<Props> = ({
  filters,
  selectedCategory,
}) => {
  const getElements = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
  ) => {
    if (!attribute.dependsBy) {
      return attribute.possibleValues[0].values;
    }
    const filter = filters?.find(
      (filter) => attribute.dependsBy && filter.name === attribute.dependsBy,
    );
    let values: string[] = [];

    if (filter) {
      attribute.possibleValues.forEach((possibleValue) =>
        filter.selectedAttributeValues?.forEach((selectedAttributeValue) => {
          if (selectedAttributeValue === possibleValue.dependingKey) {
            values = possibleValue.values;
          }
        }),
      );
    }

    return values;
  };

  return (
    <View key={selectedCategory.identifier} style={styles.container}>
      <View style={styles.filters}>
        {selectedCategory.attributes &&
          selectedCategory.attributes.map((attribute, key) =>
            attribute.type === ATTRIBUTE_TYPES.RANGE ? (
              <RangeFilter
                key={key}
                filters={filters}
                title={attribute.title}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.MULTI_SELECT ? (
              <MultiSelectFilter
                elements={getElements(attribute)}
                filters={filters}
                title={attribute.title}
                key={key}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.SELECT ? (
              <SelectFilter
                elements={attribute.possibleValues[0].values}
                filters={filters}
                title={attribute.title}
                key={key}
              />
            ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
              <View key={key} />
            ) : null,
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filters: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 1200,
  },
});
