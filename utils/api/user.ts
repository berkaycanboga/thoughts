import { Post } from "../../models/Post";

import { api, urls } from "./api";

export const userApiService = {
  getUser: async (userId: number) => {
    return api.get(urls.user(userId));
  },

  updateUser: async (
    userId: number,
    userData: { username?: string; fullName?: string; email?: string },
  ) => {
    return api.put(urls.user(userId), { userData });
  },

  deleteUser: async (userId: number) => {
    return api.delete(urls.user(userId));
  },

  getLikedPostsByUserId: async (userId: number) => {
    return api.get<Post[]>(urls.userLikedPosts(userId));
  },

  getPostsByUserComments: async (userId: number) => {
    return api.get<Post[]>(urls.userCommentsPosts(userId));
  },
};
