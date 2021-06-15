import * as React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import attributeLabels from '../../../assets/texts/attributes.json';
import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { Filter } from '../../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../../utils/constants';
import { maxContentWidth } from '../../utils/theme/layout';
import { MultiSelectFilter } from './MultiSelectFilter';
import { RangeFilter } from './Range';
import { SelectFilter } from './SelectFilter';

interface Props {
  filters?: Filter[];
  selectedCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  filterStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const FiltersContainer: React.FC<Props> = ({
  filters,
  selectedCategory,
  filterStyle,
  labelStyle,
}) => {
  const getAttributeLabel = (title: string) =>
    attributeLabels[title as keyof typeof attributeLabels];

  const getElements = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => {
    if (!attribute.dependsBy) {
      return attribute.possibleValues[0].values;
    }
    const filter = filters?.find(
      (filter) => attribute.dependsBy && filter.name === attribute.dependsBy
    );
    let values: string[] = [];

    if (filter) {
      attribute.possibleValues.forEach((possibleValue) =>
        filter.selectedAttributeValues?.forEach((selectedAttributeValue) => {
          if (selectedAttributeValue === possibleValue.dependingKey) {
            values = possibleValue.values;
          }
        })
      );
    }

    return values;
  };

  return (
    <View key={selectedCategory.identifier} style={styles.container}>
      <View style={styles.filters}>
        {selectedCategory.attributes &&
          selectedCategory.attributes.map((attribute, key) => (
            <View
              key={key}
              style={[styles.filter, filterStyle, { zIndex: 98 - key }]}
            >
              {attribute.type === ATTRIBUTE_TYPES.RANGE ? (
                <RangeFilter
                  label={getAttributeLabel(attribute.title)}
                  labelStyle={labelStyle}
                  filters={filters}
                  title={attribute.title}
                />
              ) : attribute.type === ATTRIBUTE_TYPES.MULTI_SELECT ? (
                <MultiSelectFilter
                  label={getAttributeLabel(attribute.title)}
                  elements={getElements(attribute)}
                  labelStyle={labelStyle}
                  filters={filters}
                  title={attribute.title}
                />
              ) : attribute.type === ATTRIBUTE_TYPES.SELECT ? (
                <SelectFilter
                  label={getAttributeLabel(attribute.title)}
                  labelStyle={labelStyle}
                  elements={attribute.possibleValues[0].values}
                  filters={filters}
                  title={attribute.title}
                />
              ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
                <View key={key} />
              ) : null}
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  filters: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: maxContentWidth,
  },
  filter: {
    width: '100%',
  },
});
