import { PostProps } from "../../models/Post";

import { api, urls } from "./api";

export const userApiService = {
  getUser: async (userId: number) => {
    return api.get(urls.user(userId));
  },

  getLikedPostsByUserId: async (userId: number) => {
    return api.get<PostProps[]>(urls.userLikedPosts(userId));
  },

  getPostsByUserComments: async (userId: number) => {
    return api.get<PostProps[]>(urls.userCommentsPosts(userId));
  },
};
