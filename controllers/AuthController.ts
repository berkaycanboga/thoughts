import { SignUpUser } from "../models/User";
import { createUser } from "../services/AuthService";

export const signUp = async (userData: SignUpUser) => {
  const { password, ...rest } = userData;

  const user = await createUser({ ...rest, password });

  return user;
};
