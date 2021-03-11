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
