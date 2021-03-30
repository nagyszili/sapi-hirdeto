import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { Platform } from 'react-native';

import {
  uiStateVar,
  isLoggedInVar,
  currencyVar,
  sortTypeVar,
} from './reactiveVariables';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        findAllAds:
          Platform.OS === 'web'
            ? offsetLimitPagination([
                'queryString',
                'mainCategoryIdentifier',
                'categoryIdentifier',
                'inDescription',
                'sortField',
                'sortOrder',
                'location',
                'currency',
                'filters',
                'page',
                'perPage',
              ])
            : {
                keyArgs: [
                  'queryString',
                  'mainCategoryIdentifier',
                  'categoryIdentifier',
                  'inDescription',
                  'sortField',
                  'sortOrder',
                  'location',
                  'currency',
                  'filters',
                ],
                merge(existing = [], incoming: any[], { readField }) {
                  const newAds = incoming.filter(
                    (ad) =>
                      !existing.some(
                        (existingAd: any) =>
                          readField({ fieldName: 'id', from: existingAd }) ===
                          readField({ fieldName: 'id', from: ad }),
                      ),
                  );
                  const merged = [...existing, ...newAds];
                  return merged;
                },
              },
        findAdsByUser: {
          keyArgs: false,
          merge(existing = [], incoming: any[], { readField }) {
            const newAds = incoming.filter(
              (ad) =>
                !existing.some(
                  (existingAd: any) =>
                    readField({ fieldName: 'id', from: existingAd }) ===
                    readField({ fieldName: 'id', from: ad }),
                ),
            );
            const merged = [...existing, ...newAds];
            return merged;
          },
        },
        uiState: {
          read() {
            return uiStateVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        currency: {
          read() {
            return currencyVar();
          },
        },
        sortType: {
          read() {
            return sortTypeVar();
          },
        },
      },
    },
    User: {
      fields: {
        favorites: {
          merge: false,
        },
      },
    },
  },
});
