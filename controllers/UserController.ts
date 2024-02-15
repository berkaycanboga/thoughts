import {
  getLikedPostsByUserId,
  getPostsByUserComments,
  getUserById,
  getUserIdByUsername,
} from "../services/UserService";

export const getUserByIdController = async (userId: number) => {
  return getUserById(userId);
};

export const getUserIdByUsernameController = async (username: string) => {
  return getUserIdByUsername(username);
};

export const getLikedPostsByUserIdController = async (userId: number) => {
  const likedPosts = await getLikedPostsByUserId(userId);
  return likedPosts;
};

export const getPostsByUserCommentsController = async (userId: number) => {
  const postsByComments = await getPostsByUserComments(userId);
  return postsByComments;
};
