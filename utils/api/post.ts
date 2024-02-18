import { PostProps } from "../../models/Post";

import { api, urls } from "./api";

export const postsApiService = {
  createPost: async (userId: number, content: string) => {
    return api.post<PostProps>(urls.userPosts(userId), { content });
  },

  getPost: async (userId: number, postId: number) => {
    return api.get<PostProps>(urls.userPosts(userId, postId));
  },

  getUserPosts: async (userId: number) => {
    return api.get<PostProps[]>(urls.userPosts(userId));
  },

  updatePost: async (userId: number, postId: number, content: string) => {
    return api.put<PostProps>(urls.userPosts(userId, postId), { content });
  },

  deletePost: async (userId: number, postId: number) => {
    return api.delete<PostProps>(urls.userPosts(userId, postId));
  },
};
