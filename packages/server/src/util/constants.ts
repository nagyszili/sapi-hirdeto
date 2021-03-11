export const ROLES = {
  USER: 'user',
  MANAGER: 'manager',
};

export const LOGIN_TYPES = {
  PASSWORD: 'password',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

export const ATTRIBUTE_TYPES = {
  SELECT: 'select',
  MULTI_SELECT: 'multiSelect',
  CHECKBOX: 'checkbox',
  RANGE: 'range',
};

export const ATTRIBUTE_NAMES = {
  GENERAL: {
    PRICE: 'price',
  },
  CARS: {
    BRAND: 'brand',
    MODEL: 'model',
    YEAR_OF_MANUFACTURE: 'year of manufacture',
    TURNOVER: 'turnover',
    ENGINE_CAPACITY: 'engine capacity',
    CONDITION: 'condition',
    COMBUSTIBLE: 'combustible',
    CAR_BODY: 'car body',
    COLOR: 'color',
    GEARBOX: 'gearbox',
  },
  CAR_PARTS: {
    CONDITION: 'condition',
  },
  MOTORCYCLES: {
    TYPE: 'type',
    YEAR_OF_MANUFACTURE: 'year of manufacture',
    ENGINE_CAPACITY: 'engine capacity',
    CONDITION: 'condition',
  },
  CAMERA_PHOTO: {
    CATEGORY: 'category',
    BRAND: 'brand',
    CONDITION: 'condition',
  },
  PHONES: {
    BRAND: 'brand',
    CONDITION: 'condition',
  },
  APPLIANCES: {
    CATEGORY: 'category',
    BRAND: 'brand',
    CONDITION: 'condition',
  },
  JOB: {
    MOBILITY: 'mobility',
    TYPE: 'type',
  },
  LAPTOP_PC: {
    BRAND: 'brand',
    CONDITION: 'condition',
  },
  TV: {
    BRAND: 'brand',
    CONDITION: 'condition',
  },
  HOUSE_FOR_SALE: {
    ROOMS: 'rooms',
    TYPE: 'type',
    USABLE_AREA: 'usable area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
  },
  HOUSE_FOR_RENT: {
    ROOMS: 'rooms',
    TYPE: 'type',
    USABLE_AREA: 'usable area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
  },
  APARTMENT_FOR_SALE: {
    ROOMS: 'rooms',
    TYPE: 'type',
    USABLE_AREA: 'usable area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
    FLOOR: 'floor',
  },
  APARTMENT_FOR_RENT: {
    ROOMS: 'rooms',
    TYPE: 'type',
    USABLE_AREA: 'usable area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
    FLOOR: 'floor',
  },
  LAND: {
    USABLE_AREA: 'usable area',
    TYPE: 'type',
  },
  CLOTHES: {
    CATEGORY: 'category',
    CONDITION: 'condition',
    SIZE: 'size',
    COLOR: 'color',
    BRAND: 'brand',
    SEX: 'sex',
  },
  SHOES: {
    CATEGORY: 'category',
    CONDITION: 'condition',
    SIZE: 'size',
    COLOR: 'color',
    BRAND: 'brand',
    SEX: 'sex',
  },
  GARDEN: {
    CATEGORY: 'category',
    CONDITION: 'condition',
  },
  HOME: {
    CATEGORY: 'category',
    CONDITION: 'condition',
  },
  ANIMALS: {
    CATEGORY: 'category',
  },
  FOOD: {
    CATEGORY: 'category',
  },
};

export const ERROR_CODES = {
  CATEGORY: {
    NOT_FOUND: 'category.notFound',
  },
  MAIN_CATEGORY: {
    NOT_FOUND: 'mainCategory.notFound',
  },
  USER: {
    NOT_FOUND: 'user.notFound',
    BAD_CREDENTIALS: 'user.badCredentials',
    UNAUTHORIZED: 'user.unauthorized',
    EMAIL_ALREADY_USED: 'user.emailAlreadyUsed',
  },
  AD: {
    NOT_FOUND: 'ad.notFound',
    NOT_FOUND_COUNT: 'ad.notFoundCount',
  },
};

export const CURRENCY = {
  EURO: 'euro',
  LEI: 'lei',
};
