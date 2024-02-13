import { UserCRUD } from "../models/User";
import {
  deleteUser,
  getLikedPostsByUserId,
  getPostsByUserComments,
  getUserIdByUsername,
  updateUser,
} from "../services/UserService";

export const getUserIdByUsernameController = async (username: string) => {
  return getUserIdByUsername(username);
};

export const updateUserController = async (
  userId: number,
  updatedData: Partial<UserCRUD>,
) => {
  return updateUser(userId, updatedData);
};

export const deleteUserController = async (userId: number) => {
  return deleteUser(userId);
};

export const getLikedPostsByUserIdController = async (userId: number) => {
  const likedPosts = await getLikedPostsByUserId(userId);
  return likedPosts;
};

export const getPostsByUserCommentsController = async (userId: number) => {
  const postsByComments = await getPostsByUserComments(userId);
  return postsByComments;
};
