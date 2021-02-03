import * as React from 'react';
import { ViewStyle, View, StyleProp } from 'react-native';

import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../utils/constants';
import { Select } from './Select';

interface Props {
  elements: string[];
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  style?: StyleProp<ViewStyle>;
  title: string;
}

export const SelectFilter: React.FC<Props> = ({
  elements,
  filters,
  setFilters,
  style,
  title,
}) => {
  const thisFilter = filters.find((filter) => filter.name === title);

  const allElement = [{ name: 'All', identifier: '', id: 0 }].concat(
    elements.map((element, key) => ({
      name: element,
      identifier: element,
      id: key + 1,
    })),
  );

  const setSelectedElement = (element: string) => {
    if (element === '') {
      setFilters((oldFilters) =>
        oldFilters.filter((filter) => filter.name !== title),
      );
    } else {
      setFilters((oldFilters) =>
        oldFilters.find((filter) => filter.name === title)
          ? oldFilters.map((filter) =>
              filter.name === title
                ? { ...filter, selectedAttributeValues: [element] }
                : filter,
            )
          : [
              ...oldFilters,
              {
                type: ATTRIBUTE_TYPES.SELECT,
                name: title,
                selectedAttributeValues: [element],
              },
            ],
      );
    }
  };

  const selectedElement =
    thisFilter &&
    thisFilter.selectedAttributeValues &&
    thisFilter.selectedAttributeValues[0];

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
