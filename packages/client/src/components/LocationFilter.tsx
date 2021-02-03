import * as React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const LocationFilter: React.FC<Props> = ({ style }) => {
  return (
    <View style={style}>
      {/* <SelectFilter
        elements={allCategories}
        setSelectedElement={setSelectedCategory}
        selectedElement={selectedCategory}
      /> */}
    </View>
  );
};
