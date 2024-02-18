import { CommentProps } from "../../models/Comment";

import { api, urls } from "./api";

export const commentsApiService = {
  createComment: async (userId: number, postId: number, content: string) => {
    return api.post<CommentProps>(urls.postComments(userId, postId), {
      content,
    });
  },

  getCommentByPostId: async (commentId: number, postId: number) => {
    return api.get<CommentProps[]>(urls.postComments(postId, commentId));
  },

  getCommentsByPostId: async (userId: number, postId: number) => {
    return api.get<CommentProps[]>(urls.postComments(userId, postId));
  },

  deleteComment: async (userId: number, postId: number, commentId: number) => {
    return api.delete<CommentProps>(
      urls.postComments(userId, postId, commentId),
    );
  },
};
