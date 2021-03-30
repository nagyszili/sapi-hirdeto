import * as React from 'react';
import { ViewStyle, View, StyleProp } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { SelectInput } from './Select/SelectInput';

interface Props {
  categories: any[];
  selectedCategory?: string;
  setSelectedCategory: (category: string) => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  defaultValue?: string;
}

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  categories,
  setSelectedCategory,
  style,
  label,
  defaultValue,
}) => {
  let allCategories = [{ label: defaultValue ?? texts['all'], value: '' }];
  allCategories = allCategories.concat(
    categories.map((category) => ({
      label: category.name,
      value: category.identifier,
    }))
  );

  return (
    <View style={[style]}>
      <SelectInput
        label={label}
        elements={allCategories}
        setSelectedElement={setSelectedCategory}
        selectedElement={selectedCategory}
      />
    </View>
  );
};
