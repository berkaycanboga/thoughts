import { PostCRUD } from "../models/Post";
import prisma from "../utils/prisma";

export const createPost = async (postData: PostCRUD) => {
  const { authorId, ...rest } = postData;

  const post = await prisma.post.create({
    data: {
      ...rest,
      author: { connect: { id: authorId } },
    },
    include: { author: true },
  });

  return post;
};

export const getPostById = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true, comment: { include: { user: true } } },
  });

  return post;
};

export const getUserPosts = async (userId: number) => {
  const userPosts = await prisma.post.findMany({
    where: { authorId: userId },
    include: { author: true, comment: { include: { user: true } } },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return userPosts;
};

export const getFollowerPostsByUserId = async (userId: number) => {
  const userFollowing = await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: {
            id: userId,
          },
        },
      },
    },
    include: { author: true, comment: { include: { user: true } } },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return userFollowing;
};

export const updatePost = async (
  postId: number,
  updatedData: Partial<PostCRUD>,
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
