import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, 10);

export const comparePassword = (
  oldPassword: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(oldPassword, hashedPassword);

export const generateIdentifier = (): string => {
  return Math.random().toString(20).substr(2, 8);
};
