import {
  createPostLike,
  createCommentLike,
  deleteLike,
  getPostLikes,
  getCommentLikes,
  getPostLike,
} from "../services/LikeService";

export const createPostLikeController = async (
  userId: number,
  postId: number,
) => {
  return createPostLike(userId, postId);
};

export const getPostLikeController = async (
  likedId: number,
  postId: number,
) => {
  return getPostLike(likedId, postId);
};

export const getPostLikesController = async (postId: number) => {
  return getPostLikes(postId);
};

export const createCommentLikeController = async (
  userId: number,
  commentId: number,
) => {
  return createCommentLike(userId, commentId);
};

export const getCommentLikeController = async (
  likedId: number,
  commentId: number,
) => {
  return getPostLike(likedId, commentId);
};

export const getCommentLikesController = async (commentId: number) => {
  return getCommentLikes(commentId);
};

export const deleteLikeController = async (likeId: number) => {
  return deleteLike(likeId);
};
