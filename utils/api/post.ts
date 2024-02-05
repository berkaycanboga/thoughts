import { Post } from "../../models/Post";
import { api, urls } from "./api";

export const postsApiService = {
  createPost: async (userId: number, content: string) => {
    return api.post<Post>(urls.userPosts(userId), { content });
  },

  getPost: async (userId: number, postId: number) => {
    return api.get<Post>(urls.userPosts(userId, postId));
  },

  getUserPosts: async (userId: number) => {
    return api.get<Post[]>(urls.userPosts(userId));
  },

  updatePost: async (userId: number, postId: number, content: string) => {
    return api.put<Post>(urls.userPosts(userId, postId), { content });
  },

  deletePost: async (userId: number, postId: number) => {
    return api.delete<Post>(urls.userPosts(userId, postId));
  },
};
