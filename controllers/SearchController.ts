import { searchPosts, searchUsers } from "../services/SearchService";

export const searchPostsController = async (searchTerm: string) => {
  const posts = await searchPosts(searchTerm);
  return posts;
};

export const searchUsersController = async (searchTerm: string) => {
  const users = await searchUsers(searchTerm);
  return users;
};
