import { CategoryInput } from 'src/category/category.input';
import { ATTRIBUTE_TYPES, ATTRIBUTE_NAMES } from 'src/util/constants';

export const CategoryMock: CategoryInput[] = [
  {
    mainCategoryId: 'jarmuvek',
    identifier: 'auto',
    name: 'Autó',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.CARS.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [{ values: ['Audi', 'BMW', 'Dacia', 'Ford', 'Opel'] }],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.MODEL,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        dependsBy: ATTRIBUTE_NAMES.CARS.BRAND,
        possibleValues: [
          {
            dependingKey: 'Audi',
            values: [
              'A1',
              'A2',
              'A3',
              'A4',
              'A4 Allroad',
              'A5',
              'A6',
              'A6 Allroad',
              'A7',
              'A8',
            ],
          },
          {
            dependingKey: 'BMW',
            values: [
              'M1',
              'M3',
              'M5',
              'M6',
              'X1',
              'X3',
              'X5',
              'X6',
              'Z1',
              'Z3',
              'Z4',
              'Z8',
            ],
          },
          {
            dependingKey: 'Dacia',
            values: [
              '1300',
              '1310',
              '1400',
              '1410',
              'Duster',
              'Logan',
              'Logan Van',
            ],
          },
          {
            dependingKey: 'Ford',
            values: [
              'Escort',
              'Focus',
              'Explorer',
              'F150',
              'F250',
              'F350',
              'Fiesta',
            ],
          },
          {
            dependingKey: 'Opel',
            values: [
              'Astra',
              'Corsa',
              'Frontera',
              'Meriva',
              'Monza',
              'Insignia',
              'Vectra',
              'Zafira',
            ],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.COLOR,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              'Fehér',
              'Fekete',
              'Szürke',
              'Ezüst',
              'Kék',
              'Piros',
              'Zöld',
              'Sárga / Arany',
              'Maro / Bej',
              'Egyéb',
            ],
          },
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
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: ['Benzin', 'Dízel', 'LPG', 'Hibrid', 'Elektromos', 'Egyéb'],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              'Sedan',
              'Cabrio',
              'Coupe',
              'Pick-up',
              'Kombi',
              'Kisbusz',
              'Ferdehátú',
              'Terepjáró',
              'Egyterü',
              'Egyéb',
            ],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CARS.GEARBOX,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Manuális', 'Automata'] }],
      },
    ],
  },
  {
    mainCategoryId: 'jarmuvek',
    identifier: 'autoalkatresz-felszereles',
    name: 'Autóalkatrész, felszerelés',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.CAR_PARTS.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
    ],
  },
  {
    mainCategoryId: 'jarmuvek',
    identifier: 'motor-robogo',
    name: 'Motor, robogo, ATV',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.MOTORCYCLES.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
      {
        title: ATTRIBUTE_NAMES.MOTORCYCLES.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['ATV', 'Motor', 'Robogó'] }],
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
  {
    mainCategoryId: 'ingatlan',
    identifier: 'elado-lakas',
    name: 'Eladó lakás',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          { values: ['1 szoba', '2 szoba', '3 szoba', '4 vagy több szoba'] },
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
          {
            values: [
              'Földszint',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '10+',
              'Tetőtér',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'ingatlan',
    identifier: 'telek',
    name: 'Telek, föld',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.LAND.USABLE_AREA,
        type: ATTRIBUTE_TYPES.RANGE,
        possibleValues: [],
      },
      {
        title: ATTRIBUTE_NAMES.LAND.TYPE,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [{ values: ['Beltelek', 'Kültelek'] }],
      },
    ],
  },
  {
    mainCategoryId: 'ingatlan',
    identifier: 'kiado-lakas',
    name: 'Kiadó lakás',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APARTMENT_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          { values: ['1 szoba', '2 szoba', '3 szoba', '4 vagy több szoba'] },
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
          {
            values: [
              'Földszint',
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '10+',
              'Tetőtér',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'ingatlan',
    identifier: 'elado-haz',
    name: 'Eladó ház',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              '1 szoba',
              '2 szoba',
              '3 szoba',
              '4 szoba',
              '5 szoba',
              '6+ szoba',
            ],
          },
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
    mainCategoryId: 'ingatlan',
    identifier: 'kiado-haz',
    name: 'Kiadó ház',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.HOUSE_FOR_SALE.ROOMS,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              '1 szoba',
              '2 szoba',
              '3 szoba',
              '4 szoba',
              '5 szoba',
              '6+ szoba',
            ],
          },
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
    mainCategoryId: 'munkahely',
    identifier: 'it-telekommunikacio',
    name: 'IT - Telekommunikáció',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.JOB.MOBILITY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          { values: ['Kiszállásos', 'Távmunka', 'Stabil munkapont'] },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.JOB.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              'Teljes munkaidő',
              'Részmunkaidő',
              'Alkalmi munka',
              'Projekt alapú',
              'Diákmunka',
              'Szakmai gyakorlat',
              'Egyéb',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'munkahely',
    identifier: 'marketing-pr-media',
    name: 'Marketing - PR - Média',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.JOB.MOBILITY,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          { values: ['Kiszállásos', 'Távmunka', 'Stabil munkapont'] },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.JOB.TYPE,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [
          {
            values: [
              'Teljes munkaidő',
              'Részmunkaidő',
              'Alkalmi munka',
              'Projekt alapú',
              'Diákmunka',
              'Szakmai gyakorlat',
              'Egyéb',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'elektronika',
    identifier: 'mobiltelefon-kommunikacio',
    name: 'Mobiltelefon, kommunikácio',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.PHONES.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
      {
        title: ATTRIBUTE_NAMES.PHONES.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Samsung',
              'Apple',
              'Microsoft-Nokia',
              'Allview',
              'HTC',
              'Alcatel',
              'Egyéb',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'elektronika',
    identifier: 'muszaki-elektronikai-keszulekek',
    name: 'Műszaki, elektronikai készülékek',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.APPLIANCES.CATEGORY,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Porszívó',
              'Légkondicionáló',
              'Konyhai eszközök',
              'Hűtő',
              'Mosógép',
            ],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.APPLIANCES.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Arctic',
              'Beko',
              'Bosch',
              'Electrolux',
              'LG',
              'Samsung',
              'Siemens',
              'Whirlpool',
              'Egyéb',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'elektronika',
    identifier: 'szamitastechnika',
    name: 'Számítástechnika',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.LAPTOP_PC.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Acer',
              'Apple',
              'Asus',
              'Dell',
              'HP',
              'Lenovo',
              'Samsung',
              'Sony',
              'Egyéb',
            ],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.LAPTOP_PC.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
    ],
  },
  {
    mainCategoryId: 'elektronika',
    identifier: 'fenykepezogep-kamera',
    name: 'Fényképezőgép, kamera',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Canon',
              'Fujifilm',
              'Nikon',
              'Olympus',
              'Panasonic',
              'Pentax',
              'Sigma',
              'Sony',
              'Egyéb',
            ],
          },
        ],
      },
      {
        title: ATTRIBUTE_NAMES.CAMERA_PHOTO.CATEGORY,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          {
            values: [
              'Fényképezőgép',
              'Videókamera',
              'Objektívek és kiegészítők',
              'Egyéb',
            ],
          },
        ],
      },
    ],
  },
  {
    mainCategoryId: 'elektronika',
    identifier: 'TV',
    name: 'TV',
    attributes: [
      {
        title: ATTRIBUTE_NAMES.TV.CONDITION,
        type: ATTRIBUTE_TYPES.MULTI_SELECT,
        possibleValues: [{ values: ['Használt', 'Új'] }],
      },
      {
        title: ATTRIBUTE_NAMES.TV.BRAND,
        type: ATTRIBUTE_TYPES.SELECT,
        possibleValues: [
          { values: ['LG', 'Samsung', 'Philips', 'Sony', 'Egyéb'] },
        ],
      },
    ],
  },
];
