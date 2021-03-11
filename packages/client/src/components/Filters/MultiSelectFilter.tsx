import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { Filter } from '../../apollo/types/graphql-global-types';
import { getFiltersAfterRemove, addMultiSelectFilter } from '../../utils';
import { MultiSelect } from './MultiSelect';

interface Props {
  elements: string[];
  filters?: Filter[];
  title: string;
}

export const MultiSelectFilter: React.FC<Props> = ({
  elements,
  filters,
  title,
}) => {
  const navigation = useNavigation();
  const filter = filters && filters.find((filter) => filter.name === title);

  const allElements = [{ label: 'All', value: '' }].concat(
    elements.map((element) => ({
      label: element,
      value: element,
      selected:
        filter?.selectedAttributeValues?.some(
          (selectedAttributeValue) => selectedAttributeValue === element,
        ) || undefined,
    })),
  );

  const setSelectedElements = (selectedElements: string[]) => {
    const isAll = selectedElements.some((element) => element === '');
    if (selectedElements.length === 0 || isAll) {
      navigation.setParams({
        filters: getFiltersAfterRemove(title, filters),
      });
    } else {
      navigation.setParams({
        filters: addMultiSelectFilter(title, selectedElements, filters, filter),
      });
    }
  };

  return (
    <MultiSelect
      elements={allElements}
      setSelectedElements={setSelectedElements}
    />
  );
};
