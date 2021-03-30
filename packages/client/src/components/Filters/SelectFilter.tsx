import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { ViewStyle, View, StyleProp } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Filter } from '../../apollo/types/graphql-global-types';
import { getFiltersAfterRemove, addSelectFilter } from '../../utils';
import { SelectInput } from './Select/SelectInput';

interface Props {
  elements: string[];
  filters?: Filter[];
  style?: StyleProp<ViewStyle>;
  title: string;
  label?: string;
}

export const SelectFilter: React.FC<Props> = ({
  elements,
  filters,
  style,
  title,
  label,
}) => {
  const navigation = useNavigation();
  const filter = filters && filters.find((filter) => filter.name === title);

  const allElement = [{ label: texts['all'], value: '' }].concat(
    elements.map((element, key) => ({
      label: element,
      value: element,
    }))
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
      <SelectInput
        label={label}
        elements={allElement}
        setSelectedElement={setSelectedElement}
        selectedElement={selectedElement || undefined}
      />
    </View>
  );
};
