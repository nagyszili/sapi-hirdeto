/*random generate: szoba szam, ferohely, emelet */
import { ATTRIBUTE_NAMES } from '../../../util/constants';
import * as accomendations from '../../../../assets/accomendation.json';

const accomData = accomendations;
let locationsForAccomendation;
const currency = accomData.ad_currency.currency;
const negotiable = accomData.ad_negotiable.negotiable;
const types = accomData.type;

function randNumberGenerator(length) {
  const number = Math.random() * length;
  if (Math.floor(number) == 0) {
    randNumberGenerator(length);
  }
  return Math.floor(number);
}

function randomImages(images) {
  const arrImages = [];
  const lengthOfImages = randNumberGenerator(images.length) || 2;
  for (let index = 0; index < lengthOfImages; index++) {
    arrImages.push({
      priority: index,
      url: images[randNumberGenerator(images.length)],
    });
  }

  return arrImages;
}

function constData(type) {
  const dataType = accomData[type];
  const randImages = randomImages(dataType.images);
  const acmndtConst = {
    name: dataType.ad_title[randNumberGenerator(dataType.ad_title.length)],
    price: randNumberGenerator(200),
    currency: currency[randNumberGenerator(currency.length)],
    negotiable: negotiable[randNumberGenerator(negotiable.length)],
    description:
      dataType.description[randNumberGenerator(dataType.description.length)],
    images: randImages,
    thumbnail: randImages[0],
  };
  return acmndtConst;
}

function HotelMock() {
  const rndLocation =
    locationsForAccomendation[
      randNumberGenerator(locationsForAccomendation.length)
    ];
  const HotelData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.GUESTHOUSE_HOTEL_MOTEL.ROOMS,
        value: randNumberGenerator(5),
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'panzio-hotel-motel',
  };

  return HotelData;
}

function CabanaMock() {
  const rndLocation =
    locationsForAccomendation[
      randNumberGenerator(locationsForAccomendation.length)
    ];

  const CabanaData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CABANA.MAXIMUM_OCCUPANCY,
        value: randNumberGenerator(15),
      },
      {
        key: ATTRIBUTE_NAMES.CABANA.ROOMS,
        value: randNumberGenerator(5),
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'kabana',
  };

  return CabanaData;
}

function HouseMock() {
  const rndLocation =
    locationsForAccomendation[
      randNumberGenerator(locationsForAccomendation.length)
    ];

  const HouseData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.HOUSES_VILLAS.ROOMS,
        value: randNumberGenerator(5),
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'haz-villa',
  };

  return HouseData;
}

function AccomApartmentMock() {
  const rndLocation =
    locationsForAccomendation[
      randNumberGenerator(locationsForAccomendation.length)
    ];
  const ApartmentData = {
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.ACCOMMONDABLE_APARTMENT.ROOMS,
        value: randNumberGenerator(5),
      },
      {
        key: ATTRIBUTE_NAMES.ACCOMMONDABLE_APARTMENT.FLOOR,
        value: randNumberGenerator(10),
      },
    ],
    location: {
      name: rndLocation.name,
      county: rndLocation.county,
      longitude: rndLocation.longitude,
      latitude: rndLocation.latitude,
    },
    categoryId: 'szallas-lakas',
  };

  return ApartmentData;
}

function AccomendationCreator(times) {
  const accomandationsArray = [];
  let helper = times;
  while (helper) {
    const accomendationType = types[randNumberGenerator(types.length)];

    if (accomendationType == 'cabana') {
      let temp = times;
      while (temp) {
        const constantData = constData(accomendationType);
        const typeMock = CabanaMock();
        const merged = { ...constantData, ...typeMock };
        accomandationsArray.push(merged);
        --temp;
      }
    }
    if (accomendationType == 'guest_hotel_motel') {
      let temp = times;
      while (temp) {
        const constantData = constData(accomendationType);
        const typeMock = HotelMock();
        const merged = { ...constantData, ...typeMock };
        accomandationsArray.push(merged);
        --temp;
      }
    }
    if (accomendationType == 'house_villa') {
      let temp = times;
      while (temp) {
        const constantData = constData(accomendationType);
        const typeMock = HouseMock();
        const merged = { ...constantData, ...typeMock };
        accomandationsArray.push(merged);
        --temp;
      }
    }
    if (accomendationType == 'acmndbl_apartment') {
      let temp = times;
      while (temp) {
        const constantData = constData(accomendationType);
        const typeMock = AccomApartmentMock();
        const merged = { ...constantData, ...typeMock };
        accomandationsArray.push(merged);
        --temp;
      }
    }

    --helper;
  }
  return accomandationsArray;
}

export function initializationAndRunAccomendations(times, locations) {
  locationsForAccomendation = locations;
  return AccomendationCreator(times);
}
