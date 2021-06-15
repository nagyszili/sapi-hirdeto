import {
  Filter,
  LocationQueryInput,
} from '../../apollo/types/graphql-global-types';
import {
  parseFilters,
  stringifyFilters,
  parsePage,
  stringifyPage,
  stringifyLocation,
  parseLocation,
} from '../../utils/parsers';
import { LinkingConfig } from './types';

export const linkingConfig: LinkingConfig = {
  screens: {
    HomeScreen: {
      path: '',
      parse: {
        location: (location: string) => parseLocation(location),
      },
      stringify: {
        location: (location?: LocationQueryInput | null) =>
          stringifyLocation(location),
      },
    },
    AdsScreen: {
      path: '/hirdetesek/:mainCategoryIdentifier?/:categoryIdentifier?',
      parse: {
        inDescription: Boolean,
        page: (page: string) => parsePage(page),
        filters: (filter: string) => parseFilters(filter),
        location: (location: string) => parseLocation(location),
      },
      stringify: {
        page: (page: number) => stringifyPage(page),
        filters: (filters: Filter[]) => stringifyFilters(filters),
        location: (location?: LocationQueryInput | null) =>
          stringifyLocation(location),
      },
    },
    AdDetailsScreen: '/ad-details/:identifier',
    CreateAdScreen: '/uj-hirdetes',
    ProfileScreen: 'profil',
    AdminScreen: 'admin-panel',
    FavoritesScreen: 'kedvencek',
    MyAdsScreen: 'sajat-hirdeteseim',
    UpdateAdScreen: 'hirdetes-frissitese/:identifier',
    NotFound: '*',
  },
};
