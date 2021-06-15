import { InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { Dimensions } from 'react-native';

import { MIN_WIDTH_FOR_NATIVE_VIEW_ON_WEB } from '../utils/theme/responsiveness';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        findAllAds:
          Dimensions.get('window').width > MIN_WIDTH_FOR_NATIVE_VIEW_ON_WEB
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
                'creatorId',
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
                  'creatorId',
                  'currency',
                  'filters',
                ],
                merge(existing = [], incoming: any[], { args, readField }) {
                  if (existing.length / args!.perPage < args!.page) {
                    return existing;
                  }

                  const newAds = incoming.filter(
                    (ad) =>
                      !existing.some(
                        (existingAd: any) =>
                          readField({ fieldName: 'id', from: existingAd }) ===
                          readField({ fieldName: 'id', from: ad })
                      )
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
                    readField({ fieldName: 'id', from: ad })
                )
            );
            const merged = [...existing, ...newAds];
            return merged;
          },
        },
      },
    },
    AdListItem: {
      keyFields: ['id', 'currency'],
    },
  },
});
