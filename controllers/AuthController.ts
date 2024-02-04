import { LoginUser, SignUpUser } from "../models/User";
import { createUser, findUser } from "../services/AuthService";

export const signUp = async (userData: SignUpUser) => {
  const { password, ...rest } = userData;

  const user = await createUser({ ...rest, password });

  return user;
};

export const signIn = async (credentials: LoginUser) => {
  const user = await findUser(credentials);

  if (!user) {
    throw new Error("Authentication failed: User not found");
  }

  return user;
};
