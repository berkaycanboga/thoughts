import { api, urls } from "./api";

export const likesApiService = {
  createPostLike: async (userId: number, postId: number) => {
    return api.post(urls.postLikes(userId, postId));
  },

  getPostLike: async (userId: number, postId: number, likeId: number) => {
    return api.get(urls.postLikes(userId, postId, likeId));
  },

  getPostLikes: async (userId: number, postId: number) => {
    return api.get(urls.postLikes(userId, postId));
  },

  deletePostLike: async (userId: number, postId: number, likeId: number) => {
    return api.delete(urls.postLikes(userId, postId, likeId));
  },

  createCommentLike: async (
    userId: number,
    postId: number,
    commentId: number,
  ) => {
    return api.post(urls.commentLikes(userId, postId, commentId));
  },

  getCommentLikes: async (
    userId: number,
    postId: number,
    commentId: number,
  ) => {
    return api.get(urls.commentLikes(userId, postId, commentId));
  },

  deleteCommentLike: async (
    userId: number,
    postId: number,
    commentId: number,
    likeId: number,
  ) => {
    return api.delete(urls.commentLikes(userId, postId, commentId, likeId));
  },
};
