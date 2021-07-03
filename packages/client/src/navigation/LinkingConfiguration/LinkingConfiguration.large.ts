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
      path: 'sapi-hirdeto',
      parse: {
        location: (location: string) => parseLocation(location),
      },
      stringify: {
        location: (location?: LocationQueryInput | null) =>
          stringifyLocation(location),
      },
    },
    AdsScreen: {
      path: 'sapi-hirdeto/hirdetesek/:mainCategoryIdentifier?/:categoryIdentifier?',
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
    AdDetailsScreen: 'sapi-hirdeto/hirdetes/:identifier',
    CreateAdScreen: 'sapi-hirdeto/uj-hirdetes',
    ProfileScreen: 'sapi-hirdeto/profil',
    AdminScreen: 'sapi-hirdeto/admin-panel',
    FavoritesScreen: 'sapi-hirdeto/kedvencek',
    MyAdsScreen: 'sapi-hirdeto/sajat-hirdeteseim',
    UpdateAdScreen: 'sapi-hirdeto/hirdetes-frissitese/:identifier',
    NotFound: 'sapi-hirdeto/*',
  },
};
