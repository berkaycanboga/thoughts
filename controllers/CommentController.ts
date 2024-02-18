import { CommentProps } from "../models/Comment";
import {
  createComment,
  getCommentsByPostId,
  deleteComment,
  getCommentByPostId,
} from "../services/CommentService";

export const createCommentController = async (commentData: CommentProps) => {
  return createComment(commentData);
};
export const getCommentByIdController = async (
  commentId: number,
  postId: number,
) => {
  return getCommentByPostId(commentId, postId);
};

export const getCommentsByPostIdController = async (postId: number) => {
  return getCommentsByPostId(postId);
};

export const deleteCommentController = async (commentId: number) => {
  return deleteComment(commentId);
};
