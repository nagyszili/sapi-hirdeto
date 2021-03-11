import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ViewStyle, View, StyleProp } from 'react-native';

import { Filter } from '../../apollo/types/graphql-global-types';
import { getFiltersAfterRemove, addSelectFilter } from '../../utils';
import { Select } from './Select';

interface Props {
  elements: string[];
  filters?: Filter[];
  style?: StyleProp<ViewStyle>;
  title: string;
}

export const SelectFilter: React.FC<Props> = ({
  elements,
  filters,
  style,
  title,
}) => {
  const navigation = useNavigation();
  const filter = filters && filters.find((filter) => filter.name === title);

  const allElement = [{ name: 'All', identifier: '', id: 0 }].concat(
    elements.map((element, key) => ({
      name: element,
      identifier: element,
      id: key + 1,
    })),
  );

  const setSelectedElement = (element: string) => {
    if (element === '') {
      navigation.setParams({
        filters: getFiltersAfterRemove(title, filters),
      });
    } else {
      navigation.setParams({
        filters: addSelectFilter(title, element, filters, filter),
      });
    }
  };

  const selectedElement =
    filter &&
    filter.selectedAttributeValues &&
    filter.selectedAttributeValues[0];

  return (
    <View style={style}>
      <Select
        elements={allElement}
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement || undefined}
      />
    </View>
  );
};
