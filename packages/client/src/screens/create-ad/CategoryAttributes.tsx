import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import {
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier,
  CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes,
} from '../../apollo/types/CategoriesByMainCategoryIdentifier';
import { AttributeValueInput } from '../../apollo/types/graphql-global-types';
import { Element } from '../../components/Filters/Select/SelectInput.props';
import { Text } from '../../components/themed/Text';
import { attributeName } from '../../utils';
import { ATTRIBUTE_TYPES } from '../../utils/constants';
import * as Color from '../../utils/theme/colors';
import { SelectInput } from './../../components/Filters/Select/SelectInput';
interface Props {
  attributes: AttributeValueInput[];
  selectedCategory: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier;
  setAttributes: React.Dispatch<React.SetStateAction<AttributeValueInput[]>>;
}

export const CategoryAttributes: React.FC<Props> = ({
  selectedCategory,
  setAttributes,
  attributes: selectedAttributes,
}) => {
  const onChangeText = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => (value: string) => {
    setAttributes((oldAttributes) =>
      oldAttributes.find((oldAttribute) => oldAttribute.key === attribute.title)
        ? oldAttributes.map((oldAttribute) =>
            oldAttribute.key === attribute.title
              ? {
                  ...oldAttribute,
                  value: value.replace(/[^0-9]/g, ''),
                }
              : oldAttribute
          )
        : [
            ...oldAttributes,
            {
              key: attribute.title,
              value: value.replace(/[^0-9]/g, ''),
              type: attribute.type,
            },
          ]
    );
  };

  const onSelect = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => (value: string) => {
    setAttributes((oldAttributes) =>
      oldAttributes.find((oldAttribute) => oldAttribute.key === attribute.title)
        ? oldAttributes.map((oldAttribute) =>
            oldAttribute.key === attribute.title
              ? { ...oldAttribute, value }
              : oldAttribute
          )
        : [
            ...oldAttributes,
            { key: attribute.title, value, type: attribute.type },
          ]
    );
  };

  const getSelectedElement = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => selectedAttributes.find((attr) => attr.key === attribute.title)?.value;

  const getElements = (
    attribute: CategoriesByMainCategoryIdentifier_findCategoriesByMainCategoryIdentifier_attributes
  ) => {
    let elements: Element[] = [{ label: texts['select'], value: '' }];
    if (attribute.dependsBy) {
      const dependentAttr = selectedAttributes.find(
        (selectedAttribute) => selectedAttribute.key === attribute.dependsBy
      );

      for (const possibleValue of attribute.possibleValues) {
        if (possibleValue.dependingKey === dependentAttr?.value) {
          elements = elements.concat(
            possibleValue.values.map((value) => ({
              label: value,
              value,
            }))
          );
        }
      }
    } else {
      elements = elements.concat(
        attribute.possibleValues[0].values.map((value) => ({
          label: value,
          value,
        }))
      );
    }
    return elements;
  };

  return (
    <View key={selectedCategory.id}>
      {selectedCategory.attributes &&
        selectedCategory.attributes.map((attribute, key) => (
          <View key={key} style={[styles.attribute, { zIndex: 100 - key }]}>
            {attribute.type === ATTRIBUTE_TYPES.RANGE ? (
              <View>
                <Text style={styles.label}>
                  {attributeName(attribute.title)}
                </Text>
                <TextInput
                  key={key}
                  style={styles.inputStyle}
                  value={
                    selectedAttributes.find(
                      (attr) => attr.key === attribute.title
                    )?.value || ''
                  }
                  onChangeText={onChangeText(attribute)}
                />
              </View>
            ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
              <View key={key} />
            ) : (
              <SelectInput
                key={key}
                elements={getElements(attribute)}
                setSelectedElement={onSelect(attribute)}
                label={attributeName(attribute.title)}
                selectedElement={getSelectedElement(attribute)}
              />
            )}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 46,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderColor: Color.greyColor,
    borderWidth: 1,
    borderRadius: 6,
  },
  attribute: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    color: Color.greyDarkColor,
    marginBottom: 7,
  },
});
