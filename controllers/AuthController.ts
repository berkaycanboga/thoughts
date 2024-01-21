import { LoginUser, SignUpUser } from "../models/User";
import { comparePassword } from "../utils/bcrypt";
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

  const isPasswordValid = comparePassword(credentials.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Authentication failed: Invalid password");
  }

  return user;
};
