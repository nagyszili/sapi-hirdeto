import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, 10);

export const comparePassword = (
  oldPassword: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(oldPassword, hashedPassword);
