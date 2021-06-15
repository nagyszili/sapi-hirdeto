import { ATTRIBUTE_NAMES } from '../../../util/constants';
import * as vehicles from '../../../../assets/vehicle.json';

const vehicleData = vehicles;

let locationsForCars;

const currency = vehicleData.ad_currency.currency;
const brands = vehicleData.ad_car_brands;
const colors = vehicleData.ad_car_colors;
const car_body = vehicleData.ad_car_body;
const car_combustible = vehicleData.ad_car_combustible;
const gearbox = vehicleData.ad_car_gearbox;
const condition = vehicleData.ad_car_condition;
const engine_capacity = vehicleData.ad_car_engine_capacity;
const turnover = vehicleData.ad_car_turnover;
const y_o_m = vehicleData.ad_car_year_of_manufacturer;
const price = vehicleData.ad_price;
const negotiable = vehicleData.ad_negotiable;

const filledMock = [];

function vehicleMock() {
  return {
    name: '',
    price: 0,
    negotiable: false,
    currency: '',
    description: '',
    images: [],
    thumbnail: {},
    attributeValues: [
      {
        key: ATTRIBUTE_NAMES.CARS.BRAND,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.MODEL,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.COLOR,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CAR_BODY,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.COMBUSTIBLE,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.GEARBOX,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.ENGINE_CAPACITY,
        value: 0,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.CONDITION,
        value: '',
      },
      {
        key: ATTRIBUTE_NAMES.CARS.TURNOVER,
        value: 0,
      },
      {
        key: ATTRIBUTE_NAMES.CARS.YEAR_OF_MANUFACTURE,
        value: 0,
      },
    ],
    location: {
      name: '',
      county: '',
      longitude: 0,
      latitude: 0,
    },
    categoryId: 'auto',
  };
}

function randNumberGenerator(length) {
  const number = Math.random() * length;
  return Math.floor(number);
}

function createCar(brand) {
  const titles = vehicleData.ad_titles[brand];
  const descripiton = vehicleData.ad_description[brand];
  const images = vehicleData.ad_images[brand];
  const models = vehicleData.ad_car_models[brand];
  const rndLocation =
    locationsForCars[randNumberGenerator(locationsForCars.length)];

  const vehicle_mock = vehicleMock();

  vehicle_mock.name = titles[randNumberGenerator(titles.length)];
  vehicle_mock.price = price[randNumberGenerator(price.length)];
  vehicle_mock.currency = currency[randNumberGenerator(currency.length)];
  vehicle_mock.negotiable =
    negotiable[randNumberGenerator(negotiable.negotiable)];
  vehicle_mock.description =
    descripiton[randNumberGenerator(descripiton.length)];

  const photos = randNumberGenerator(images.length) || 1;

  for (let index = 0; index < photos; index++) {
    vehicle_mock.images.push({
      priority: index,
      url: images[randNumberGenerator(images.length)],
    });
  }
  vehicle_mock.thumbnail = vehicle_mock.images[0];
  vehicle_mock.attributeValues[0].value = brand;
  vehicle_mock.attributeValues[1].value =
    models[randNumberGenerator(models.length)];
  vehicle_mock.attributeValues[2].value =
    colors[randNumberGenerator(colors.length)];
  vehicle_mock.attributeValues[3].value =
    car_body[randNumberGenerator(car_body.length)];
  vehicle_mock.attributeValues[4].value =
    car_combustible[randNumberGenerator(car_combustible.length)];
  vehicle_mock.attributeValues[5].value =
    gearbox[randNumberGenerator(gearbox.length)];
  vehicle_mock.attributeValues[6].value =
    engine_capacity[randNumberGenerator(engine_capacity.length)];
  vehicle_mock.attributeValues[7].value =
    condition[randNumberGenerator(condition.length)];
  vehicle_mock.attributeValues[8].value =
    turnover[randNumberGenerator(turnover.length)];
  vehicle_mock.attributeValues[9].value =
    y_o_m[randNumberGenerator(y_o_m.length)];

  vehicle_mock.location.name = rndLocation.name;
  vehicle_mock.location.county = rndLocation.county;
  vehicle_mock.location.longitude = rndLocation.longitude;
  vehicle_mock.location.latitude = rndLocation.latitude;

  filledMock.push(vehicle_mock);
}

function generateRandomCar(times) {
  while (times > 0) {
    const randBrand = brands[randNumberGenerator(brands.length)];
    createCar(randBrand);
    --times;
  }
  return filledMock;
}

export function initializationAndRunCars(times, locations) {
  locationsForCars = locations;
  return generateRandomCar(times);
}
