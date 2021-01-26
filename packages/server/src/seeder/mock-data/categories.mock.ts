import { CategoryInput } from 'src/category/category.input';
import { ATTRIBUTE_TYPES, ATTRIBUTE_NAMES } from 'src/util/constants';

export const CategoryMock: CategoryInput[] = [
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'autoturisme',
    name: 'Autoturisme',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.CARS.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: ['Audi', 'BMW', 'Cadillac', 'Dacia', 'Ford', 'Opel'],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.COLOR,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          'Alb',
          'Negru',
          'Gri',
          'Argintiu',
          'Albastru',
          'Rosu',
          'Verde',
          'Galben / Auriu',
          'Maro / Bej',
          'Alte culoare',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.YEAR_OF_MANUFACTURE,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.TURNOVER,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.ENGINE_CAPACITY,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Toate', 'Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          'Benzina',
          'Diesel',
          'GPL',
          'Hibrid',
          'Electric',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          'Cabrio',
          'Berlina',
          'Coupe',
          'Pickup',
          'Hatchback',
          'Break',
          'Off-road',
          'Minibus',
          'Monovolum',
          'SUV',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.GEARBOX,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Toate', 'Manuala', 'Automata'],
      },
    ],
  },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'piese-accesorii',
    name: 'Piese - Accesorii',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'autoutilitare',
    name: 'Autoutilitare',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'motociclete-scutere-atv',
    name: 'Motociclete - Scutere - ATV',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'camioane-utilaje-rulote-remorci',
    name: 'Camioane - Rulote - Remorci',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'vehicule-pentru-dezmembrare',
    name: 'Vehicule pentru dezmembrare',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'apartamente-garsoniere-de-vanzare',
    name: 'Apartamente - Garsoniere de vanzare',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APARTMENT.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          '1 camera',
          '2 camere',
          '3 camere',
          '4 sau mai multe camere',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          'Decomandat',
          'Semidecomandat',
          'Nedecomandat',
          'Circular',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT.YEAR_OF_CONSTRUCTION,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT.FLOOR,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Toate',
          'Parter',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10 sau peste',
          'Mansarda',
        ],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'terenuri',
    name: 'Terenuri',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'apartamente-garsoniere-de-inchiriat',
    name: 'Apartamente - Garsoniere de inchiriat',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'casa-de-vanzare',
    name: 'Casa de vanzare',
    attributes: [
      {
        title: 'Camere',
        type: 'Checkbox',
        possibleValues: ['1 camera', '2 camere', '3 camere', '4 sau mai multe'],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'case-de-inchiriat',
    name: 'Case de inchiriat',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'cazare-turism',
    name: 'Cazare - Turism',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'birouri-spatii-comerciale',
    name: 'Birouri - Spatii comerciale',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'alte-proprietati',
    name: 'Alte proprietati',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'it-telecomunicatii',
    name: 'IT - Telecomunicatii',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'caut-loc-de-munca',
    name: 'Caut loc de munca',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'marketing-pr-media',
    name: 'Marketing - PR - Media',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'confectii-croitori',
    name: 'Confectii - Croitori',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'telefoane-mobile',
    name: 'Telefoane',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'electrocasnice',
    name: 'Electrocasnice',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'laptop–calculator',
    name: 'Laptop – Calculator',
    attributes: [
      {
        title: 'RAM',
        type: 'Checkbox',
        possibleValues: ['2GB', '4GB', '8GB', '16GB'],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'camera-foto-video',
    name: 'Aparate Foto - Camere Video',
    attributes: [
      {
        title: '',
        type: '',
        possibleValues: [],
      },
    ],
  },
];
