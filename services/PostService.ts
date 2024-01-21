import { Post } from "../models/Post";
import prisma from "../utils/prisma";

export const createPost = async (postData: Post) => {
  const { authorId, ...rest } = postData;

  const post = await prisma.post.create({
    data: {
      ...rest,
      author: { connect: { id: authorId } },
    },
  });

  return post;
};

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  return post;
};

export const getUserPosts = async (userId: number) => {
  const userPosts = await prisma.post.findMany({
    where: { authorId: userId },
  });

  return userPosts;
};

export const getUserFollowingPosts = async (userId: number) => {
  const userFollowingPosts = await prisma.post.findMany({
    where: {
      author: {
        following: {
          some: { id: userId },
        },
      },
    },
  });

  return userFollowingPosts;
};

export const updatePost = async (
  postId: number,
  updatedData: Partial<Post>,
) => {
  const { authorId, ...rest } = updatedData;

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: {
      ...rest,
      author: { connect: { id: authorId } },
    },
  });

  return updatedPost;
};

export const deletePost = async (postId: number) => {
  const deletedPost = await prisma.post.delete({
    where: { id: postId },
  });

  return deletedPost;
};
