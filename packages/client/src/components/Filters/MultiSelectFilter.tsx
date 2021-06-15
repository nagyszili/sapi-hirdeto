import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import texts from '../../../assets/texts/texts.json';
import { Filter } from '../../apollo/types/graphql-global-types';
import { getFiltersAfterRemove, addMultiSelectFilter } from '../../utils';
import { Element } from '../Filters/Select/SelectInput.props';
import { MultiSelect } from './MultiSelect';

interface Props {
  elements: string[];
  filters?: Filter[];
  title: string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
}

export const MultiSelectFilter: React.FC<Props> = ({
  elements,
  filters,
  title,
  label,
  labelStyle,
}) => {
  const navigation = useNavigation();
  const filter = filters && filters.find((filter) => filter.name === title);
  const selectedFilters = () =>
    filter?.selectedAttributeValues?.map((attribute) => ({
      value: attribute,
      label: attribute,
    }));

  const allElements: Element[] = [{ label: texts['all'], value: '' }].concat(
    elements.map((element) => ({
      label: element,
      value: element,
    }))
  );

  const setSelectedElements = (selectedElements: Element[]) => {
    const isAll = selectedElements.some((element) => element.value === '');
    if (selectedElements.length === 0 || isAll) {
      navigation.setParams({
        filters: getFiltersAfterRemove(title, filters),
      });
    } else {
      navigation.setParams({
        filters: addMultiSelectFilter(
          title,
          selectedElements.map((element) => element.value),
          filters,
          filter
        ),
      });
    }
  };

  return (
    <MultiSelect
      label={label}
      labelStyle={labelStyle}
      elements={allElements}
      selectedElements={selectedFilters() || []}
      placeholder={allElements[0].label}
      setSelectedElements={setSelectedElements}
    />
  );
};
