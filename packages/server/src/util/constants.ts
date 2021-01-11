export const ROLES = {
  USER: 'user',
  MANAGER: 'manager',
};

export const LOGIN_TYPES = {
  PASSWORD: 'password',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
};

export const ERROR_CODES = {
  CATEGORY: {
    NOT_FOUND: 'category.notFound',
  },
  USER: {
    NOT_FOUND: 'user.notFound',
    BAD_CREDENTIALS: 'user.badCredentials',
    UNAUTHORIZED: 'user.unauthorized',
    EMAIL_ALREADY_USED: 'user.emailAlreadyUsed',
    PHONE_VALIDATION_FAILED: 'user.phoneValidationFailed',
    INVALID_VERIFICATION_CODE: 'user.invalidVerificationCode',
    WRONG_CURRENT_PASSWORD: 'user.wrongCurrentPassword',
    CANNOT_CHANGE_PASSWORD_IN_CURRENT_LOGIN_TYPE:
      'user.cannotChangePasswordInCurrentLoginType',
    CANNOT_CHANGE_PASSWORD_OR_EMAIL_IN_CURRENT_LOGIN_TYPE:
      'user.cannotChangePasswordOrEmailInCurrentLoginType',
  },
};
