import { PostCRUD } from "../models/Post";
import {
  createPost,
  getPostById,
  getUserPosts,
  getUserFollowingPosts,
  updatePost,
  deletePost,
} from "../services/PostService";

export const createPostController = async (postData: PostCRUD) => {
  return createPost(postData);
};

export const getPostByIdController = async (postId: number) => {
  return getPostById(postId);
};

export const getUserPostsController = async (userId: number) => {
  return getUserPosts(userId);
};

export const getUserFollowingPostsController = async (userId: number) => {
  return getUserFollowingPosts(userId);
};

export const updatePostController = async (
  postId: number,
  updatedData: Partial<PostCRUD>,
) => {
  return updatePost(postId, updatedData);
};

export const deletePostController = async (postId: number) => {
  return deletePost(postId);
};
