import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { SelectInput } from '../../../components/Filters/Select';
import { InputError } from '../../../components/InputError';
import { Text } from '../../../components/themed/Text';
import { attributeName } from '../../../utils';
import { ATTRIBUTE_TYPES } from '../../../utils/constants';
import * as Color from '../../../utils/theme/colors';
import { CategoryAttributesProps } from './CategoryAttributes.props';

export const CategoryAttributes: React.FC<CategoryAttributesProps> = ({
  selectedCategory,
  getSelectedAttribute,
  getError,
  getPossibleValues,
  onChangeAttribute,
}) => {
  return (
    <View key={selectedCategory.id}>
      {selectedCategory.attributes &&
        selectedCategory.attributes.map((attribute, key) => (
          <View key={key} style={[styles.attribute, { zIndex: 100 - key }]}>
            {attribute.type === ATTRIBUTE_TYPES.RANGE ? (
              <View>
                <Text style={styles.label}>
                  {attributeName(attribute.title)}
                  {attribute.required && '*'}
                </Text>
                <TextInput
                  style={styles.inputStyle}
                  value={getSelectedAttribute(attribute)}
                  onChangeText={onChangeAttribute(attribute)}
                />
                <InputError error={getError(attribute)} />
              </View>
            ) : attribute.type === ATTRIBUTE_TYPES.CHECKBOX ? (
              <View key={key} />
            ) : (
              <SelectInput
                elements={getPossibleValues(attribute)}
                setSelectedElement={onChangeAttribute(attribute)}
                label={`${attributeName(attribute.title)}${
                  attribute.required ? '*' : ''
                }`}
                selectedElement={getSelectedAttribute(attribute)}
                error={getError(attribute)}
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
