import { Comment } from "../../models/Comment";

import { api, urls } from "./api";

export const commentsApiService = {
  createComment: async (userId: number, postId: number, content: string) => {
    return api.post<Comment>(urls.postComments(userId, postId), { content });
  },

  getCommentByPostId: async (commentId: number, postId: number) => {
    return api.get<Comment[]>(urls.postComments(postId, commentId));
  },

  getCommentsByPostId: async (userId: number, postId: number) => {
    return api.get<Comment[]>(urls.postComments(userId, postId));
  },

  deleteComment: async (userId: number, postId: number, commentId: number) => {
    return api.delete<Comment>(urls.postComments(userId, postId, commentId));
  },
};
