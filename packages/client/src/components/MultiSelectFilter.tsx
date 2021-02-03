import * as React from 'react';

import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from '../utils/constants';
import { MultiSelect } from './MultiSelect';

interface Props {
  elements: string[];
  filters: Filter[];
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>;
  title: string;
}

export const MultiSelectFilter: React.FC<Props> = ({
  elements,
  filters,
  setFilters,
  title,
}) => {
  const filter = filters.find((filter) => filter.name === title);

  const allElements = [{ label: 'All', value: '' }].concat(
    elements.map((element) => ({
      label: element,
      value: element,
    })),
  );

  const setSelectedElements = (elements: string[]) => {
    const isAll = elements.some((element) => element === '');
    if (elements.length === 0 || isAll) {
      setFilters((oldFilters) =>
        oldFilters.filter((filter) => filter.name !== title),
      );
    } else {
      setFilters((oldFilters) =>
        oldFilters.find((filter) => filter.name === title)
          ? oldFilters.map((filter) =>
              filter.name === title
                ? {
                    ...filter,
                    selectedAttributeValues: elements,
                  }
                : filter,
            )
          : [
              ...oldFilters,
              {
                type: ATTRIBUTE_TYPES.MULTI_SELECT,
                name: title,
                selectedAttributeValues: elements,
              },
            ],
      );
    }
  };

  return (
    <MultiSelect
      elements={allElements}
      selectedElements={filter?.selectedAttributeValues || undefined}
      setSelectedElements={setSelectedElements}
    />
  );
};
