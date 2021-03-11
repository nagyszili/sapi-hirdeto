import * as React from 'react';
import { ViewStyle, View, StyleProp } from 'react-native';

import { Select } from './Select';

interface Props {
  categories: any[];
  selectedCategory?: string;
  setSelectedCategory: (category: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const CategoryFilter: React.FC<Props> = ({
  selectedCategory,
  categories,
  setSelectedCategory,
  style,
}) => {
  let allCategories = [{ name: 'All Categories', identifier: '', id: 0 }];
  allCategories = allCategories.concat(
    categories.map((category, key) => ({
      name: category.name,
      identifier: category.identifier,
      id: key + 1,
    })),
  );

  return (
    <View style={style}>
      <Select
        elements={allCategories}
        setSelectedElement={setSelectedCategory}
        selectedElement={selectedCategory}
      />
    </View>
  );
};
