import Constants from 'expo-constants';
import { Share } from 'react-native';

import attributesText from '../../assets/texts/attributes.json';
import { Filter } from '../apollo/types/graphql-global-types';
import { ATTRIBUTE_TYPES } from './constants';

export const attributeName = (text: string): string =>
  attributesText[text as keyof typeof attributesText] || text;

export const formatCreatedDateToString = (createdAt: Date) =>
  isToday(createdAt)
    ? 'Ma'
    : isYesterday(createdAt)
    ? 'Tegnap'
    : `${createdAt.getFullYear()}. ${
        months[createdAt.getMonth() as keyof typeof months]
      } ${createdAt.getDate()}.`;

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  return (
    date.getDate() === yesterday.getDate() - 1 &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

export const formatPriceToString = (price: number) =>
  price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

export const months = {
  0: 'január',
  1: 'február',
  2: 'március',
  3: 'április',
  4: 'május',
  5: 'június',
  6: 'július',
  7: 'augusztus',
  8: 'szeptember',
  9: 'október',
  10: 'november',
  11: 'december',
};

export const getFiltersAfterRemove = (title: string, filters?: Filter[]) =>
  filters && filters.filter((filter) => filter.name !== title).length > 0
    ? filters.filter((filter) => filter.name !== title)
    : undefined;

export const addRangeFilter = (
  title: string,
  from: string,
  to: string,
  filters?: Filter[],
  filter?: Filter,
) =>
  filter && filters
    ? filters.map((oldFilter) =>
        oldFilter.name === title
          ? {
              type: oldFilter.type,
              name: oldFilter.name,
              from: parseInt(from, 10),
              to: parseInt(to, 10),
            }
          : oldFilter,
      )
    : filters
    ? [
        ...filters,
        {
          type: ATTRIBUTE_TYPES.RANGE,
          name: title,
          from: parseInt(from, 10),
          to: parseInt(to, 10),
        },
      ]
    : [
        {
          type: ATTRIBUTE_TYPES.RANGE,
          name: title,
          from: parseInt(from, 10),
          to: parseInt(to, 10),
        },
      ];

export const addMultiSelectFilter = (
  title: string,
  selectedElements: string[],
  filters?: Filter[],
  filter?: Filter,
) =>
  filter && filters
    ? filters.map((oldFilter) =>
        oldFilter.name === title
          ? {
              ...oldFilter,
              selectedAttributeValues: selectedElements,
            }
          : oldFilter,
      )
    : filters
    ? [
        ...filters,
        {
          type: ATTRIBUTE_TYPES.MULTI_SELECT,
          name: title,
          selectedAttributeValues: selectedElements,
        },
      ]
    : [
        {
          type: ATTRIBUTE_TYPES.MULTI_SELECT,
          name: title,
          selectedAttributeValues: selectedElements,
        },
      ];

export const addSelectFilter = (
  title: string,
  element: string,
  filters?: Filter[],
  filter?: Filter,
) =>
  filters && filter
    ? filters.map((oldFilter) =>
        oldFilter.name === title
          ? { ...oldFilter, selectedAttributeValues: [element] }
          : oldFilter,
      )
    : filters
    ? [
        ...filters,
        {
          type: ATTRIBUTE_TYPES.SELECT,
          name: title,
          selectedAttributeValues: [element],
        },
      ]
    : [
        {
          type: ATTRIBUTE_TYPES.SELECT,
          name: title,
          selectedAttributeValues: [element],
        },
      ];

export const shareAd = ({
  adName,
  adIdentifier,
}: {
  adName: string;
  adIdentifier: string;
}) =>
  Share.share(
    {
      title: `${adName}`,
      message: `${Constants?.manifest?.extra?.clientUrl}/ad-details/${adIdentifier}`,
      url: `${Constants?.manifest?.extra?.clientUrl}/ad-details/${adIdentifier}`,
    },
    {
      dialogTitle: `${adName}`,
    },
  );

export const shareAdOnFacebook = ({
  adName,
  adIdentifier,
}: {
  adName: string;
  adIdentifier: string;
}) =>
  // @ts-ignore
  FB.ui({
    method: 'share',
    quote: `${adName}`,
    href: `${Constants?.manifest?.extra?.clientUrl}/ad-details/${adIdentifier}`,
    display: 'popup',
  });
