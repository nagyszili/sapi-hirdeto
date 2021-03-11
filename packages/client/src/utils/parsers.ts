import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from './constants';

export const parsePage = (page: string) => {
  return parseInt(page, 10) - 1;
};

export const parseFilters = (filters: string) => {
  const urlFilters = filters.split(',');
  let parsedFilters: Filter[] = [];
  urlFilters.forEach((urlFilter) => {
    if (urlFilter) {
      const nameValue = urlFilter.split('_');
      const isInParsedFilters = parsedFilters.some(
        (parsedFilter) => parsedFilter.name === nameValue[1],
      );
      if (nameValue.length > 1 && nameValue[0] === ATTRIBUTE_TYPES.RANGE) {
        const fromValue = nameValue[2].split('=');
        if (isInParsedFilters) {
          parsedFilters = parsedFilters.map((parsedFilter) => {
            if (parsedFilter.name === nameValue[1]) {
              return fromValue[0] === 'from'
                ? { ...parsedFilter, from: parseInt(fromValue[1], 10) }
                : {
                    ...parsedFilter,
                    to: parseInt(fromValue[1], 10),
                  };
            }
            return parsedFilter;
          });
        } else {
          const pathFilter: Filter =
            fromValue[0] === 'from'
              ? {
                  type: ATTRIBUTE_TYPES.RANGE,
                  name: nameValue[1],
                  from: parseInt(fromValue[1], 10),
                }
              : {
                  type: ATTRIBUTE_TYPES.RANGE,
                  name: nameValue[1],
                  to: parseInt(fromValue[1], 10),
                };

          parsedFilters.push(pathFilter);
        }
      }
      if (
        nameValue[0] === ATTRIBUTE_TYPES.MULTI_SELECT ||
        nameValue[0] === ATTRIBUTE_TYPES.SELECT
      ) {
        const fromValue = nameValue[nameValue.length - 1].split('=');

        if (
          parsedFilters.some(
            (parsedFilter) => parsedFilter.name === fromValue[0],
          )
        ) {
          parsedFilters = parsedFilters.map((parsedFilter) =>
            parsedFilter.name === fromValue[0]
              ? {
                  ...parsedFilter,
                  selectedAttributeValues: parsedFilter.selectedAttributeValues
                    ? [...parsedFilter.selectedAttributeValues, fromValue[1]]
                    : [fromValue[1]],
                }
              : parsedFilter,
          );
        } else {
          const pathFilter: Filter = {
            type: ATTRIBUTE_TYPES.MULTI_SELECT,
            name: fromValue[0],
            selectedAttributeValues: [fromValue[1]],
          };

          parsedFilters.push(pathFilter);
        }
      }
    }
  });
  return filters && parsedFilters;
};

export const stringifyPage = (page: number) => {
  return (++page).toString();
};

export const stringifyFilters = (filters: Filter[]) => {
  let urlFilters = '';
  filters &&
    filters.forEach((filter) => {
      switch (filter.type) {
        case ATTRIBUTE_TYPES.RANGE: {
          if (filter.from && filter.to) {
            urlFilters =
              urlFilters +
              filter.type +
              '_' +
              filter.name +
              '_from=' +
              filter.from.toString() +
              ',' +
              filter.type +
              '_' +
              filter.name +
              '_to=' +
              filter.to.toString() +
              ',';
            break;
          }
          if (filter.from) {
            urlFilters =
              urlFilters +
              filter.type +
              '_' +
              filter.name +
              '_from=' +
              filter.from.toString() +
              ',';
            break;
          }
          if (filter.to) {
            urlFilters =
              urlFilters +
              filter.type +
              '_' +
              filter.name +
              '_to=' +
              filter.to.toString() +
              ',';
            break;
          }
          break;
        }

        case ATTRIBUTE_TYPES.SELECT:
        case ATTRIBUTE_TYPES.MULTI_SELECT: {
          if (filter.selectedAttributeValues) {
            filter.selectedAttributeValues.forEach((selectedAttribute) => {
              urlFilters =
                urlFilters +
                filter.type +
                '_' +
                filter.name +
                '=' +
                selectedAttribute +
                ',';
            });
          }
          break;
        }
      }
    });

  return filters && urlFilters;
};
