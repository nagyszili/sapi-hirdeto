import { AdInput } from 'src/ad/ad.input';
import { ATTRIBUTE_NAMES } from 'src/util/constants';

export const AdMock: AdInput[] = [
  {
    name: 'Apartament de vanzare',
    price: 30000,
    currency: 'euro',
    description:
      'A/885 Tudor, str, Progresului, confort II, decomandat, Pî din IV, transformat din uscătorie, sc 22 mp, convector, boiler, termopan, parchet, contorizat, mobilat bucătăria, posibilitate DE PRELUARE A CHIRIAŞILOR . Preţ 30.000 Euro',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/y9o997lhdbr03-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/160fcczl68uu1-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/udegldrdg8jj-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.APARTMENT.FLOOR,
        value: '4',
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.YEAR_OF_CONSTRUCTION,
        value: '1997',
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.ROOMS,
        value: '1',
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.USABLE_AREA,
        value: '22',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'apartamente-garsoniere-de-vanzare',
  },
  {
    name: 'Buick',
    price: 109.6,
    currency: 'euro',
    description: 'Enclave',
    images: [
      'http://dummyimage.com/212x130.jpg/cc0000/ffffff',
      'http://dummyimage.com/134x164.bmp/ff4444/ffffff',
      'http://dummyimage.com/128x164.jpg/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Teal',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: null,
  },
  {
    name: 'Land Rover',
    price: 450.89,
    currency: 'euro',
    description: 'Discovery Series II',
    images: [
      'http://dummyimage.com/127x142.jpg/ff4444/ffffff',
      'http://dummyimage.com/123x183.png/cc0000/ffffff',
      'http://dummyimage.com/229x209.png/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Purple',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: null,
  },
  {
    name: 'Mitsubishi',
    price: 425.53,
    currency: 'euro',
    description: 'Excel',
    images: [
      'http://dummyimage.com/218x159.png/ff4444/ffffff',
      'http://dummyimage.com/184x134.bmp/cc0000/ffffff',
      'http://dummyimage.com/118x161.jpg/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Teal',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 201.9,
    currency: 'euro',
    description: 'Thunderbird',
    images: [
      'http://dummyimage.com/236x149.jpg/cc0000/ffffff',
      'http://dummyimage.com/206x189.png/cc0000/ffffff',
      'http://dummyimage.com/137x136.bmp/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Green',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Audi',
    price: 309.41,
    currency: 'euro',
    description: 'A3',
    images: [
      'http://dummyimage.com/233x165.jpg/cc0000/ffffff',
      'http://dummyimage.com/194x142.png/cc0000/ffffff',
      'http://dummyimage.com/197x250.jpg/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Mauv',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 160.88,
    currency: 'lei',
    description: 'F450',
    images: [
      'http://dummyimage.com/158x128.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/217x110.bmp/dddddd/000000',
      'http://dummyimage.com/120x192.png/5fa2dd/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Khaki',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Dodge',
    price: 412.38,
    currency: 'lei',
    description: 'Ram 1500',
    images: [
      'http://dummyimage.com/133x208.png/ff4444/ffffff',
      'http://dummyimage.com/176x178.png/ff4444/ffffff',
      'http://dummyimage.com/149x227.jpg/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Mauv',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Chevrolet',
    price: 385.57,
    currency: 'lei',
    description: 'G-Series 3500',
    images: [
      'http://dummyimage.com/247x144.png/5fa2dd/ffffff',
      'http://dummyimage.com/213x170.png/cc0000/ffffff',
      'http://dummyimage.com/216x169.bmp/5fa2dd/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Purple',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Infiniti',
    price: 494.09,
    currency: 'lei',
    description: 'M',
    images: [
      'http://dummyimage.com/186x104.bmp/ff4444/ffffff',
      'http://dummyimage.com/104x156.bmp/dddddd/000000',
      'http://dummyimage.com/167x221.png/5fa2dd/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Puce',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: null,
  },
  {
    name: 'Hyundai',
    price: 381.66,
    currency: 'lei',
    description: 'Excel',
    images: [
      'http://dummyimage.com/159x118.bmp/ff4444/ffffff',
      'http://dummyimage.com/179x250.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/185x206.jpg/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Maroon',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Pontiac',
    price: 447.33,
    currency: 'lei',
    description: 'Sunbird',
    images: [
      'http://dummyimage.com/112x111.jpg/ff4444/ffffff',
      'http://dummyimage.com/181x154.bmp/ff4444/ffffff',
      'http://dummyimage.com/136x101.bmp/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Aquamarine',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'GMC',
    price: 417.98,
    currency: 'lei',
    description: 'Sonoma',
    images: [
      'http://dummyimage.com/167x179.jpg/5fa2dd/ffffff',
      'http://dummyimage.com/232x177.png/5fa2dd/ffffff',
      'http://dummyimage.com/162x221.jpg/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Maroon',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Suzuki',
    price: 462.95,
    currency: 'lei',
    description: 'Swift',
    images: [
      'http://dummyimage.com/146x210.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/216x237.png/5fa2dd/ffffff',
      'http://dummyimage.com/109x129.bmp/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Khaki',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Lexus',
    price: 302.43,
    currency: 'lei',
    description: 'RX',
    images: [
      'http://dummyimage.com/178x170.png/5fa2dd/ffffff',
      'http://dummyimage.com/105x160.bmp/dddddd/000000',
      'http://dummyimage.com/109x128.jpg/5fa2dd/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Blue',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Suzuki',
    price: 409.31,
    currency: 'lei',
    description: 'Verona',
    images: [
      'http://dummyimage.com/239x125.jpg/cc0000/ffffff',
      'http://dummyimage.com/237x165.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/213x187.bmp/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Indigo',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 409.88,
    currency: 'lei',
    description: 'F150',
    images: [
      'http://dummyimage.com/171x125.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/159x214.jpg/5fa2dd/ffffff',
      'http://dummyimage.com/181x222.jpg/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Aquamarine',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Subaru',
    price: 369.79,
    currency: 'euro',
    description: 'Tribeca',
    images: [
      'http://dummyimage.com/192x194.jpg/dddddd/000000',
      'http://dummyimage.com/228x166.bmp/cc0000/ffffff',
      'http://dummyimage.com/212x140.png/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Crimson',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Lincoln',
    price: 158.32,
    currency: 'euro',
    description: 'LS',
    images: [
      'http://dummyimage.com/225x156.jpg/5fa2dd/ffffff',
      'http://dummyimage.com/215x128.bmp/cc0000/ffffff',
      'http://dummyimage.com/119x192.bmp/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Khaki',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Chevrolet',
    price: 288.37,
    currency: 'euro',
    description: 'TrailBlazer',
    images: [
      'http://dummyimage.com/227x170.bmp/cc0000/ffffff',
      'http://dummyimage.com/106x103.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/239x120.png/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Blue',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 204.36,
    currency: 'euro',
    description: 'F-Series',
    images: [
      'http://dummyimage.com/128x130.jpg/dddddd/000000',
      'http://dummyimage.com/237x117.png/ff4444/ffffff',
      'http://dummyimage.com/133x227.png/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Khaki',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'Buick',
    price: 237.3,
    currency: 'euro',
    description: 'Enclave',
    images: [
      'http://dummyimage.com/126x131.bmp/cc0000/ffffff',
      'http://dummyimage.com/147x106.png/dddddd/000000',
      'http://dummyimage.com/246x233.png/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Purple',
      },
    ],
    location: {
      name: 'Municipiul Bucuresti',
      county: 'Bucuresti',
      longitude: 26.1,
      latitude: 44.44,
    },
    categoryId: null,
  },
  {
    name: 'BMW',
    price: 499.32,
    currency: 'euro',
    description: 'Z4',
    images: [
      'http://dummyimage.com/115x161.png/ff4444/ffffff',
      'http://dummyimage.com/124x100.png/ff4444/ffffff',
      'http://dummyimage.com/244x144.png/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Pink',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 56.32,
    currency: 'euro',
    description: 'E150',
    images: [
      'http://dummyimage.com/193x216.jpg/5fa2dd/ffffff',
      'http://dummyimage.com/171x122.bmp/dddddd/000000',
      'http://dummyimage.com/234x240.png/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Fuscia',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'Ford',
    price: 171.84,
    currency: 'euro',
    description: 'Excursion',
    images: [
      'http://dummyimage.com/203x155.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/142x218.png/5fa2dd/ffffff',
      'http://dummyimage.com/185x103.bmp/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Turquoise',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'BMW',
    price: 12.62,
    currency: 'euro',
    description: 'M5',
    images: [
      'http://dummyimage.com/165x136.jpg/cc0000/ffffff',
      'http://dummyimage.com/162x138.bmp/ff4444/ffffff',
      'http://dummyimage.com/143x232.jpg/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Indigo',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'Mercedes-Benz',
    price: 107.8,
    currency: 'euro',
    description: 'C-Class',
    images: [
      'http://dummyimage.com/166x165.jpg/cc0000/ffffff',
      'http://dummyimage.com/139x105.png/5fa2dd/ffffff',
      'http://dummyimage.com/115x214.jpg/ff4444/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Green',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'Mercedes-Benz',
    price: 123.27,
    currency: 'euro',
    description: 'W123',
    images: [
      'http://dummyimage.com/239x183.png/ff4444/ffffff',
      'http://dummyimage.com/213x199.png/ff4444/ffffff',
      'http://dummyimage.com/235x164.bmp/cc0000/ffffff',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Fuscia',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
  {
    name: 'Volvo',
    price: 263.84,
    currency: 'euro',
    description: 'V70',
    images: [
      'http://dummyimage.com/127x237.jpg/ff4444/ffffff',
      'http://dummyimage.com/144x184.bmp/5fa2dd/ffffff',
      'http://dummyimage.com/248x244.png/dddddd/000000',
    ],
    attributeValues: [
      {
        key: 'color',
        value: 'Goldenrod',
      },
    ],
    location: {
      name: 'Cluj-Napoca',
      county: 'Cluj',
      longitude: 23.61,
      latitude: 46.78,
    },
    categoryId: null,
  },
];
