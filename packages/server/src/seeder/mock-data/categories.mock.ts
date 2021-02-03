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
        possibleValues: ['Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Benzina', 'Diesel', 'GPL', 'Hibrid', 'Electric'],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
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
  // {
  //   mainCategoryId: 'auto-masini-moto-ambarcatiuni',
  //   identifier: 'piese-accesorii',
  //   name: 'Piese - Accesorii',
  //   attributes: [],
  // },
  // {
  //   mainCategoryId: 'auto-masini-moto-ambarcatiuni',
  //   identifier: 'autoutilitare',
  //   name: 'Autoutilitare',
  //   attributes: [],
  // },
  {
    mainCategoryId: 'auto-masini-moto-ambarcatiuni',
    identifier: 'motociclete-scutere-atv',
    name: 'Motociclete - Scutere - ATV',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.MOTORCYCLES.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.MOTORCYCLES.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['ATV', 'Motociclete', 'Scutere'],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.YEAR_OF_MANUFACTURE,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.ENGINE_CAPACITY,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
    ],
  },
  // {
  //   mainCategoryId: 'auto-masini-moto-ambarcatiuni',
  //   identifier: 'camioane-utilaje-rulote-remorci',
  //   name: 'Camioane - Rulote - Remorci',
  //   attributes: [],
  // },
  // {
  //   mainCategoryId: 'auto-masini-moto-ambarcatiuni',
  //   identifier: 'vehicule-pentru-dezmembrare',
  //   name: 'Vehicule pentru dezmembrare',
  //   attributes: [],
  // },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'apartamente-garsoniere-de-vanzare',
    name: 'Apartamente - Garsoniere de vanzare',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          '1 camera',
          '2 camere',
          '3 camere',
          '4 sau mai multe camere',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Decomandat',
          'Semidecomandat',
          'Nedecomandat',
          'Circular',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.YEAR_OF_CONSTRUCTION,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.FLOOR,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
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
        title: ATTRIBUTE_NAMES.LAND.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.LAND.TYPE,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: ['Intravilan', 'Extravilan'],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'apartamente-garsoniere-de-inchiriat',
    name: 'Apartamente - Garsoniere de inchiriat',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_RENT.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          '1 camera',
          '2 camere',
          '3 camere',
          '4 sau mai multe camere',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_RENT.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Decomandat',
          'Semidecomandat',
          'Nedecomandat',
          'Circular',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_RENT.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_RENT.YEAR_OF_CONSTRUCTION,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_RENT.FLOOR,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
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
    identifier: 'casa-de-vanzare',
    name: 'Casa de vanzare',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          '1 camera',
          '2 camere',
          '3 camere',
          '4 camere',
          '5 camere',
          '6 sau mai multe camere',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Decomandat',
          'Semidecomandat',
          'Nedecomandat',
          'Circular',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.YEAR_OF_CONSTRUCTION,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
    ],
  },
  {
    mainCategoryId: 'imobiliare',
    identifier: 'case-de-inchiriat',
    name: 'Case de inchiriat',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_RENT.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          '1 camera',
          '2 camere',
          '3 camere',
          '4 camere',
          '5 camere',
          '6 sau mai multe camere',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_RENT.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          'Decomandat',
          'Semidecomandat',
          'Nedecomandat',
          'Circular',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_RENT.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_RENT.YEAR_OF_CONSTRUCTION,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
    ],
  },
  // {
  //   mainCategoryId: 'imobiliare',
  //   identifier: 'cazare-turism',
  //   name: 'Cazare - Turism',
  //   attributes: [],
  // },
  // {
  //   mainCategoryId: 'imobiliare',
  //   identifier: 'birouri-spatii-comerciale',
  //   name: 'Birouri - Spatii comerciale',
  //   attributes: [],
  // },
  // {
  //   mainCategoryId: 'imobiliare',
  //   identifier: 'alte-proprietati',
  //   name: 'Alte proprietati',
  //   attributes: [],
  // },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'it-telecomunicatii',
    name: 'IT - Telecomunicatii',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.JOB.MOBILITY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Deplasare', 'Munca la distanta', 'Locatie stabila'],
      },
      {
        title: ATTRIBUTE_NAMES.JOB.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Full time', 'Part time', 'Project Based', 'Altele'],
      },
    ],
  },
  // {
  //   mainCategoryId: 'locuri-de-munca',
  //   identifier: 'caut-loc-de-munca',
  //   name: 'Caut loc de munca',
  //   attributes: [],
  // },
  // {
  //   mainCategoryId: 'locuri-de-munca',
  //   identifier: 'confectii-croitori',
  //   name: 'Confectii - Croitori',
  //   attributes: [],
  // },
  {
    mainCategoryId: 'locuri-de-munca',
    identifier: 'marketing-pr-media',
    name: 'Marketing - PR - Media',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.JOB.MOBILITY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Deplasare', 'Munca la distanta', 'Locatie stabila'],
      },
      {
        title: ATTRIBUTE_NAMES.JOB.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Full time', 'Part time', 'Project Based', 'Altele'],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'telefoane-mobile',
    name: 'Telefoane',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.PHONES.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.PHONES.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Samsung',
          'Apple',
          'Microsoft-Nokia',
          'Allview',
          'HTC',
        ],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'electrocasnice',
    name: 'Electrocasnice',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APPLIANCES.CATEGORY,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Aspiratore',
          'Aparate climatizare',
          'Aparate de bucatarie',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APPLIANCES.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Arctic',
          'Beko',
          'Bosch',
          'Electrolux',
          'LG',
          'Samsung',
          'Siemens',
          'Whirlpool',
          'Altele',
        ],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'laptop–calculator',
    name: 'Laptop – Calculator',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.LAPTOP_PC.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Acer',
          'Apple',
          'Asus',
          'Dell',
          'HP',
          'Lenovo',
          'Samsung',
          'Sony',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.LAPTOP_PC.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Utilizat', 'Nou'],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'camera-foto-video',
    name: 'Aparate Foto - Camere Video',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Canon',
          'Fujifilm',
          'Nikon',
          'Olympus',
          'Panasonic',
          'Pentax',
          'Sigma',
          'Sony',
          'Alta',
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.CATEGORY,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          'Obiective sis accesorii',
          'Aparate foto',
          'Camere video',
          'Camere video sport',
        ],
      },
    ],
  },
  {
    mainCategoryId: 'electronice-electrocasnice',
    identifier: 'TV',
    name: 'TV',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.TV.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: ['Utilizat', 'Nou'],
      },
      {
        title: ATTRIBUTE_NAMES.TV.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: ['LG', 'Samsung', 'Philips', 'Sony', 'Alte'],
      },
    ],
  },
];
