import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { Platform } from 'react-native';

import { isLoggedInVar, currencyVar } from './reactiveVariables';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        findAllAds:
          Platform.OS === 'web'
            ? offsetLimitPagination([
                'queryString',
                'mainCategoryId',
                'categoryId',
                'inDescription',
                'location',
                'currency',
                'filters',
                'page',
                'perPage',
              ])
            : {
                keyArgs: [
                  'queryString',
                  'mainCategoryId',
                  'categoryId',
                  'inDescription',
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
      },
    },
  },
});
