/* generate random year(1920 - 2021), and floor(1, 10), and area(10-2000)  */
import { ATTRIBUTE_NAMES } from '../../../util/constants';
import * as properties from '../../../../assets/property.json';

const propertyData = properties;
let locationsForProperty;

const type = propertyData.Type;
const rentable = propertyData.Rentable;
const condition = propertyData.Condition;
const currency = propertyData.ad_currency.currency;
const negotiable = propertyData.ad_negotiable.negotiable;

function randNumberGenerator(length) {
  const number = Math.random() * length;
  return Math.floor(number);
}

function randomDate() {
  function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
  }
  let date1: any = '01-01-1910';
  let date2: any = new Date();
  date1 = new Date(date1).getTime();
  date2 = new Date(date2).getTime();
  if (date1 > date2) {
    const randDate = new Date(randomValueBetween(date2, date1)).getFullYear();
    return randDate + 'this';
  } else {
    const randDate = new Date(randomValueBetween(date1, date2)).getFullYear();
    return randDate;
  }
}

function randomPhotos(type) {
  const imageLength = propertyData[type].images.length;
  const randNum = randNumberGenerator(imageLength);
  const images = [];
  for (let index = 0; index < randNum; index++) {
    images.push({
      priority: index,
      url: propertyData[type].images[randNumberGenerator(imageLength)],
    });
  }
  return images;
}

function constMockData(type) {
  const randImages = randomPhotos(type);
  return {
    name: propertyData[type].ad_title[
      randNumberGenerator(propertyData[type].ad_title.length)
    ],
    price: randNumberGenerator(200000),
    currency: currency[randNumberGenerator(currency.length)],
    negotiable: negotiable[randNumberGenerator(negotiable.length)],
    description:
      propertyData[type].description[
        randNumberGenerator(propertyData[type].description.length)
      ],
    images: randImages,
    thumbnail: randImages[0],
  };
}

function flatMock() {
  const rndLocation =
    locationsForProperty[randNumberGenerator(locationsForProperty.length)];
  const flatData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.APARTMENT.ROOMS,
        value: randNumberGenerator(6),
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.CONDITION,
        value: condition[randNumberGenerator(condition.length)],
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.FLOOR,
        value: randNumberGenerator(10),
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.TYPE,
        value: rentable[randNumberGenerator(rentable.length)],
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.USABLE_AREA,
        value: randNumberGenerator(2000),
      },
      {
        key: ATTRIBUTE_NAMES.APARTMENT.YEAR_OF_CONSTRUCTION,
        value: randomDate(),
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'lakas',
  };

  return flatData;
}

function houseMock() {
  const rndLocation =
    locationsForProperty[randNumberGenerator(locationsForProperty.length)];
  const houseData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.HOUSE.ROOMS,
        value: randNumberGenerator(6),
      },
      {
        key: ATTRIBUTE_NAMES.HOUSE.USABLE_AREA,
        value: randNumberGenerator(2000),
      },
      {
        key: ATTRIBUTE_NAMES.HOUSE.YEAR_OF_CONSTRUCTION,
        value: randomDate(),
      },
      {
        key: ATTRIBUTE_NAMES.HOUSE.GARDEN_AREA,
        value: randNumberGenerator(200),
      },
      {
        key: ATTRIBUTE_NAMES.HOUSE.TYPE,
        value: rentable[randNumberGenerator(rentable.length)],
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'haz',
  };

  return houseData;
}

function telekFoldMock(type) {
  const rndLocation =
    locationsForProperty[randNumberGenerator(locationsForProperty.length)];
  const telekMock = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.LAND.USABLE_AREA,
        value: randNumberGenerator(2000),
      },
      {
        key: ATTRIBUTE_NAMES.LAND.TYPE,
        value:
          propertyData[type].type[
            randNumberGenerator(propertyData[type].type.length)
          ],
      },
      {
        key: ATTRIBUTE_NAMES.LAND.RENTABLE,
        value: rentable[randNumberGenerator(rentable.length)],
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'telek-fold',
  };

  return telekMock;
}

function irodaMock() {
  const rndLocation =
    locationsForProperty[randNumberGenerator(locationsForProperty.length)];
  const iroda = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.COMMERCIAL_SPACES.USABLE_AREA,
        value: randNumberGenerator(2000),
      },
      {
        key: ATTRIBUTE_NAMES.COMMERCIAL_SPACES.TYPE,
        value: rentable[randNumberGenerator(rentable.length)],
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'iroda-uzlethelyseg-ipari-ingatlan',
  };

  return iroda;
}

const arr = [];

function createProperty(times) {
  const propertyType = type[randNumberGenerator(type.length)];
  if (propertyType == 'Lakas') {
    while (times) {
      const newLakas = flatMock();
      const newConst = constMockData(propertyType);
      const combined = { ...newConst, ...newLakas };
      arr.push(combined);
      --times;
    }
    return arr;
  }

  if (propertyType == 'Haz') {
    while (times) {
      const newHouse = houseMock();
      const newConst = constMockData(propertyType);
      const combined = { ...newConst, ...newHouse };
      arr.push(combined);
      --times;
    }
    return arr;
  }

  if (propertyType == 'Iroda') {
    while (times) {
      const newHouse = irodaMock();
      const newConst = constMockData(propertyType);
      const combined = { ...newConst, ...newHouse };
      arr.push(combined);
      --times;
    }
    return arr;
  }

  if (propertyType == 'Telek/Fold') {
    while (times) {
      const newHouse = telekFoldMock(propertyType);
      const newConst = constMockData(propertyType);
      const combined = { ...newConst, ...newHouse };
      arr.push(combined);
      --times;
    }
    return arr;
  }
}

export function initializationAndRunProperties(times, locations) {
  locationsForProperty = locations;
  return createProperty(times);
}
