import { ATTRIBUTE_NAMES, CURRENCY } from 'src/util/constants';

export const AdMock = [
  {
    name: 'Apartament de vanzare',
    price: 30000,
    currency: CURRENCY.EURO,
    description:
      'A/885 Tudor, str, Progresului, confort II, decomandat, Pî din IV, transformat din uscătorie, sc 22 mp, convector, boiler, termopan, parchet, contorizat, mobilat bucătăria, posibilitate DE PRELUARE A CHIRIAŞILOR . Preţ 30.000 Euro',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/y9o997lhdbr03-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/160fcczl68uu1-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/udegldrdg8jj-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.FLOOR,
        value: 4,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.YEAR_OF_CONSTRUCTION,
        value: 1997,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.ROOMS,
        value: 1,
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.USABLE_AREA,
        value: 22,
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
    name: 'Canon 7D Mark II',
    price: 3250,
    currency: CURRENCY.LEI,
    description:
      'Canon 7D Mark II Fratele mai mic al seriei 1Dx 72k shuttercount Se vinde: 1x body 7D Mark II 1x baterie LP-N6 1x Grip aftermarket (care merge cu 2x LP-N6) Usor negociabil.',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/1y8p4hiyri7p3-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/y8xbvu3be25y-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/qflc1q7wiqpc2-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.CONDITION,
        value: 'Utilizat',
      },
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.BRAND,
        value: 'Canon',
      },
      {
        key: ATTRIBUTE_NAMES.CAMERA_PHOTO.CATEGORY,
        value: 'Aparate foto',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'camera-foto-video',
  },
  {
    name: 'Audi a6 c6 2.0 tdi',
    price: 3999,
    currency: CURRENCY.EURO,
    description:
      'Vand audi a 6 c6 -2006 2.0 tdi blb -turbina noua -injectoare reconditionate -ax ulei rezolvat de cand am luat o -masina ruleaza perfect pe orice distanta -piele impecabila -dublu climatronic -pilot automat -faruri automate -follow me home -leave me home -stopuri led -jante audi pe 16 cu cauciucuri iarna noi Schimb doar cu Ml, touareg, land rover sport ,de preferat autoutilitare ofer dif unde e cazul',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/gs4ixfhimcdi3-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/zzqaw38qemfu-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/e4f5mubk1dg62-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CARS.COLOR,
        value: 'Negru',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.BRAND,
        value: 'Audi',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        value: 'Berlina',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CONDITION,
        value: 'Utilizat',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.ENGINE_CAPACITY,
        value: 2000,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.GEARBOX,
        value: 'Manuala',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.TURNOVER,
        value: 245000,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.YEAR_OF_MANUFACTURE,
        value: 2006,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        value: 'Diesel',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'autoturisme',
  },
  {
    name: 'IPhone 12 Pro Max 128Gb',
    price: 5800,
    currency: CURRENCY.LEI,
    description:
      'Telefonul este că nou,nefolosit,fara risc,decodat. Garanție 2ani la eMag. Fac și schimb,dacă mă ajută preț.',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/652uefun09jd1-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/t7deuluxlgqc3-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.PHONES.BRAND,
        value: 'Apple',
      },
      {
        key: ATTRIBUTE_NAMES.PHONES.CONDITION,
        value: 'Utilizat',
      },
    ],
    location: {
      name: 'Targu Mures',
      county: 'Mures',
      longitude: 24.56,
      latitude: 46.54,
    },
    categoryId: 'telefoane-mobile',
  },
  {
    name: 'Teren, 875 Mp, Targu-Mures',
    price: 45500,
    currency: 'euro',
    description:
      'Vă oferim spre vânzare un Teren Intravilan situat pe Viile Dealul Mic - 1 Mai foarte aproape de Cartierul Tudor, Dâmbu-Pietros și Belvedere. Terenul are o suprafață de 875 Mp și are o deschidere de 25 m la stradă.',
    images: [
      'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6InMycjc5eDR5ejl5Yi1BUk8iLCJ3IjpbeyJmbiI6Im8xemN3cmR4dDZ4bi1BUk8iLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.iO--830A7xTLLHI8N9SYlms2ehHl-pFYcMJDtv1_rvY/image;s=184x138;q=80',
      'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im5nY2N3MHd2MmR0bS1BUk8iLCJ3IjpbeyJmbiI6Im8xemN3cmR4dDZ4bi1BUk8iLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.zfdihCgVeR5v6ek7XMVu-nOKBsHPExNxVUBtaFsZFFU/image;s=1280x1024;q=80',
      'https://ireland.apollo.olxcdn.com/v1/files/eyJmbiI6Im5nY2N3MHd2MmR0bS1BUk8iLCJ3IjpbeyJmbiI6Im8xemN3cmR4dDZ4bi1BUk8iLCJzIjoiMTQiLCJwIjoiMTAsLTEwIiwiYSI6IjAifV19.zfdihCgVeR5v6ek7XMVu-nOKBsHPExNxVUBtaFsZFFU/image;s=1280x1024;q=80',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.LAND.USABLE_AREA,
        value: 875,
      },
      {
        key: ATTRIBUTE_NAMES.LAND.TYPE,
        value: 'Intravilan',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: 'terenuri',
  },
  {
    name: 'Televizor OLED Smart LG, 139 cm, OLED55B8PLA, 4K Ultra HD',
    price: 4000,
    currency: 'lei',
    description:
      'Televizor OLED Smart LG, 139 cm, OLED55B8PLA, 4K Ultra HD! Foarte putin folosit. În stare perfecta de functionare si estetic. PRET FIX!!!',
    images: [
      'https://frankfurt.apollo.olxcdn.com/v1/files/2x4hj7hcnv5x2-RO/image;s=1000x700',
      'https://frankfurt.apollo.olxcdn.com/v1/files/f1gt0xkdl28i1-RO/image;s=1000x700',
    ],
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.TV.CONDITION,
        value: 'Utilizat',
      },
      {
        key: ATTRIBUTE_NAMES.TV.BRAND,
        value: 'LG',
      },
    ],
    location: {
      name: 'Mureseni',
      county: 'Mures',
      longitude: 24.52,
      latitude: 46.52,
    },
    categoryId: 'TV',
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
