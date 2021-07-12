import texts from '../../assets/texts/texts.json';
import { Element } from '../components/Filters/Select/SelectInput.props';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MANAGER: 'manager',
};

export const CURRENCY = {
  EURO: 'euro',
  LEI: 'lei',
};

export const currencies: Element[] = [
  { label: 'lei', value: 'lei' },
  { label: '€', value: 'euro' },
];

export const negotiableOptions: Element[] = [
  { label: texts.falseNegotiable, value: false },
  { label: texts.trueNegotiable, value: true },
];

export const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
};

export const ATTRIBUTE_TYPES = {
  SELECT: 'select',
  MULTI_SELECT: 'multiSelect',
  CHECKBOX: 'checkbox',
  RANGE: 'range',
};

export const MAX_IMAGES_NUM = 8;
