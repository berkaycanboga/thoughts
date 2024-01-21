import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, saltRounds);

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(password, hashedPassword);
