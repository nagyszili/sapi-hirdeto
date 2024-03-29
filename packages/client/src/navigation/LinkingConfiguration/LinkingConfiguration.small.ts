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
    Main: {
      path: 'sapi-hirdeto/',
      screens: {
        Home: {
          path: '',
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
          },
        },
        Favorites: {
          path: 'kedvencek',
          screens: {
            FavoritesScreen: '',
          },
        },
        CreateAd: {
          path: 'uj-hirdetes',
          screens: {
            CreateAdScreen: '',
          },
        },
        MyAds: {
          path: 'sajat-hirdeteseim',
          screens: {
            MyAdsScreen: '',
          },
        },
        Profile: {
          path: 'profil',
          screens: {
            ProfileScreen: '',
            UpdateProfileScreen: 'profil-frissitese',
            AdminScreen: 'admin-panel',
          },
        },
      },
    },
    FiltersScreen: {
      path: 'sapi-hirdeto/szurok/:mainCategoryIdentifier?/:categoryIdentifier?',
      parse: {
        inDescription: Boolean,
        filters: (filter: string) => parseFilters(filter),
      },
      stringify: {
        filters: (filters: Filter[]) => stringifyFilters(filters),
      },
    },
    FullScreenMultiSelect: 'sapi-hirdeto/fullScreenMultiSelect',
    FullScreenSelect: 'sapi-hirdeto/fullScreenSelect',
    AdDetailsScreen: 'sapi-hirdeto/hirdetes/:identifier',
    UpdateAdScreen: 'sapi-hirdeto/hirdetes-frissitese/:identifier',
    NotFound: 'sapi-hirdeto/*',
  },
};
