import validator from 'validator';

import errors from '../../assets/texts/errors.json';

export type ValidationError = string | undefined;

export const isValidEmailPassword = (email: string, password: string) =>
  validator.isEmail(email) &&
  validator.isAlphanumeric(password) &&
  password.length >= 8;

export const emailErrorMessage = (email: string): ValidationError => {
  if (!email) {
    return errors['validator.emailEmpty'];
  }
  if (!validator.isEmail(email)) {
    return errors['validator.invalidEmail'];
  }
};

export const passwordErrorMessage = (password: string): ValidationError => {
  if (!password) {
    return errors['validator.passwordEmpty'];
  }
  if (password.length < 8) {
    return errors['validator.passwordToShort'];
  }
};

export const userNameErrorMessage = (name: string) => {
  if (!name) {
    return errors['validator.userNameError'];
  }
};

export const phoneNumberErrorMessage = (phoneNumber: string) => {
  if (!phoneNumber || !validator.isMobilePhone(phoneNumber)) {
    return errors['validator.phoneNumberError'];
  }
};

export const adTitleErrorMessage = (title: string): ValidationError => {
  if (!title || title.length < 12 || title.length > 100) {
    return errors['validator.adNameError'];
  }
};

export const adDescriptionErrorMessage = (
  description: string,
): ValidationError => {
  if (!description || description.length < 60 || description.length > 9000) {
    return errors['validator.adDescriptionError'];
  }
};

export const adPriceErrorMessage = (price: string) => {
  if (!price) {
    return errors['validator.adPriceError'];
  }
};

export const adMainCategoryError = (mainCategory: string) => {
  if (!mainCategory) {
    return errors['validator.mainCategoryError'];
  }
};

export const adCategoryError = (category: string) => {
  if (!category) {
    return errors['validator.categoryError'];
  }
};

export const adLocationError = (location: any) => {
  if (!location) {
    return errors['validator.locationError'];
  }
};

export const adCountyError = (county: any) => {
  if (!county) {
    return errors['validator.countyError'];
  }
};

export const adRequiredAttributeError = (attribute: any) => {
  if (!attribute) {
    return errors['validator.attributeError'];
  }
};
