import { Filter } from '../apollo/types/graphql-global-types';
import {
  parseFilters,
  stringifyFilters,
  parsePage,
  stringifyPage,
} from '../utils/parsers';

const config = {
  screens: {
    HomeScreen: {
      screens: {},
    },
    AdsScreen: {
      path: '/ads/:mainCategoryIdentifier?/:categoryIdentifier?',
      parse: {
        inDescription: Boolean,
        page: (page: string) => parsePage(page),
        filters: (filter: string) => parseFilters(filter),
      },
      stringify: {
        page: (page: number) => stringifyPage(page),
        filters: (filters: Filter[]) => stringifyFilters(filters),
      },
    },
    AdDetailsScreen: {
      path: '/ad-details/:identifier',
    },
    CreateAdScreen: {
      path: 'create-ad',
    },
    NotFound: '*',
  },
};

export const linking = {
  prefixes: ['http://localhost:19006/, client://'],
  config,
};
