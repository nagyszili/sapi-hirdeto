export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
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
  VEHICLE_PARTS: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  MOTORCYCLES: {
    BRAND: 'brand',
    MODEL: 'model',
    TYPE: 'type',
    YEAR_OF_MANUFACTURE: 'year of manufacture',
    ENGINE_CAPACITY: 'engine capacity',
    COLOR: 'color',
    CONDITION: 'condition',
  },
  COMMERCIAL_VEHICLE: {
    TYPE: 'type',
  },
  WHEELS_TIRES: {
    TYPE: 'type',
    SECONDARY_TYPE: 'secondary type',
    CONDITION: 'condition',
  },
  HOUSE: {
    ROOMS: 'rooms',
    TYPE: 'type',
    USABLE_AREA: 'usable area',
    GARDEN_AREA: 'garden area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
  },
  APARTMENT: {
    ROOMS: 'rooms',
    TYPE: 'type',
    CONDITION: 'condition',
    USABLE_AREA: 'usable area',
    YEAR_OF_CONSTRUCTION: 'year of construction',
    FLOOR: 'floor',
  },
  LAND: {
    USABLE_AREA: 'usable area',
    TYPE: 'type',
    RENTABLE: 'rentable',
  },
  COMMERCIAL_SPACES: {
    USABLE_AREA: 'usable area',
    TYPE: 'type',
  },
  OTHER_PROPERTIES: {
    USABLE_AREA: 'usable area',
    TYPE: 'type',
  },
  CABANA: {
    MAXIMUM_OCCUPANCY: 'maximum occupancy',
    ROOMS: 'rooms',
  },
  GUESTHOUSE_HOTEL_MOTEL: {
    ROOMS: 'rooms',
  },
  HOUSES_VILLAS: {
    ROOMS: 'rooms',
  },
  ACCOMMONDABLE_APARTMENT: {
    ROOMS: 'rooms',

    FLOOR: 'floor',
  },
  ABROAD_JOB: {
    SPECIALIZATION: 'specialization',
    TYPE: 'type',
    EXPERIENCE: 'experience',
  },
  INLAND_JOB: {
    SPECIALIZATION: 'specialization',
    TYPE: 'type',
    EXPERIENCE: 'experience',
  },
  LOOKING_FOR_JOB: {
    SPECIALIZATION: 'specialization',
    TYPE: 'type',
    EXPERIENCE: 'experience',
  },

  PC_LAPTOP_PERIPHERAL: {
    CONDITION: 'condition',
    TYPE: ' type',
  },
  TABLET_EBOOK_OTHERS: {
    CONDITION: 'condition',
    TYPE: ' type',
  },
  PHONE: {
    BRAND: 'brand',
    CONDITION: 'condition',
    TYPE: ' type',
  },
  TV_AUDIO_PHOTO_VIDEO: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  CONSOLE_VIDEOGAME: {
    BRAND: 'brand',
    CONDITION: 'condition',
    TYPE: ' type',
  },
  APPLIANCES: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  OFFICE_TOOLS: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  ACCESSORIES_PARTS: {
    TYPE: 'type',
    BRAND: 'brand',
    CONDITION: 'condition',
  },

  CARS_AND_TRANSPORT: {
    TYPE: 'type',
  },
  CONSTRUCTION_SPECIALIST: {
    TYPE: 'type',
  },
  ELECTRONIC_REPAIRS: {},
  EVENIMENTS: {
    TYPE: 'type',
  },
  SELF_CARE: {
    TYPE: 'type',
  },
  COURSES_TEACHING: {
    TYPE: 'type',
  },
  TRANSLATION_BOOKING: {},
  ADS_INSURANCE_IT: {},
  CLEANING: {},
  COMPANIES_PROFESSIONAL_EQUIPMENT: {},
  OTHER_SERVICES: {},

  ART_ANTIQUES: {},
  BOOKS_MAGAZIN: {},
  BICYCLE_AND_PARTS: {
    TYPE: 'type',
  },
  INSTRUMENTS_ACCESSORIES: {},
  FISHING: {},
  SPORT_HOBBY: {},
  GUNS: {},
  VACATION_CAMPING: {},

  PRODUCTS_AND_FOOD: {
    TYPE: 'type',
  },
  GRAIN_PLANTS: {
    TYPE: 'type',
  },
  ANIMALS: {
    TYPE: 'type',
  },

  FURNITURE_DECORATION: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  GARDENING: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  CONSTRUCTION_MATERIALS: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  TOOLS_ITEMS: {
    CONDITION: 'condition',
  },
  LIGHTING: {
    CONDITION: 'condition',
  },
  OTHER_HOUSE_GARDENING_TOOLS: {
    CONDITION: 'condition',
  },

  TOYS: {
    CONDITION: 'condition',
  },
  BABY_CLOTHING: {
    CONDITION: 'condition',
  },
  PRAM: {
    CONDITION: 'condition',
  },
  PREGNANT_CLOTHING: {
    CONDITION: 'condition',
  },
  BABYROOM_FURNITURE_DECORATION: {
    CONDITION: 'condition',
  },
  BABY_CARE: {
    BABY_CARE: 'baby_care',
  },

  F_CLOTHING_ACCESSORIES: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  M_CLOTHING_ACCESSORIES: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  CARE_HEALT: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  K_CLOTHING_ACCESSORIES: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  TEXTBOOKS: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  LITERATURE: {
    TYPE: 'type',
    CONDITION: 'condition',
  },
  COURSEBOOK: {
    TYPE: 'type',
    CONDITION: 'condition',
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

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DELETED: 'deleted',
};
