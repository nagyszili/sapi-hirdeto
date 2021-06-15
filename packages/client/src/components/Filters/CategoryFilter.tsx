import * as React from 'react';
import { ViewStyle, View, StyleProp, TextStyle } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { SelectInput } from './Select';

interface Props {
  categories?: any[];
  selectedCategory?: string;
  setSelectedCategory: (category: string) => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  defaultValue?: string;
  error?: string;
}

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  categories,
  setSelectedCategory,
  style,
  label,
  labelStyle,
  defaultValue,
  error,
}) => {
  let allCategories = [{ label: defaultValue ?? texts['all'], value: '' }];
  allCategories = allCategories.concat(
    (categories || []).map((category) => ({
      label: category.name,
      value: category.identifier,
    }))
  );

  return (
    <View style={[style]}>
      <SelectInput
        label={label}
        labelStyle={labelStyle}
        elements={allCategories}
        setSelectedElement={setSelectedCategory}
        selectedElement={selectedCategory}
        error={error}
      />
    </View>
  );
};
