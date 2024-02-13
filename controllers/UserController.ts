import { getUserIdByUsername } from "../services/UserService";

export const getUserIdByUsernameController = async (username: string) => {
  return getUserIdByUsername(username);
};
