import { getServerSession } from "next-auth";

import { authOptions } from "../app/api/auth/[...nextauth]/options";
import prisma from "../utils/prisma";

export const createPostLike = async (userId: number, postId: number) => {
  const userSession = await getServerSession(authOptions);

  if (userSession!.user.id !== userId) {
    throw new Error("Forbidden: Operation on behalf of another user");
  }

  const like = await prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
    },
  });

  return like;
};

export const getPostLike = async (likeId: number, postId: number) => {
  const postLike = await prisma.like.findUnique({
    where: { id: likeId, postId: postId },
    include: { user: true, post: true },
  });

  return postLike;
};

export const getPostLikes = async (postId: number) => {
  const postLikes = await prisma.like.findMany({
    where: { postId },
    include: { user: true, post: true },
  });

  return postLikes;
};

export const createCommentLike = async (userId: number, commentId: number) => {
  const userSession = await getServerSession(authOptions);

  if (userSession!.user.id !== userId) {
    throw new Error("Forbidden: Operation on behalf of another user");
  }

  const commentLike = await prisma.like.create({
    data: {
      user: { connect: { id: userId } },
      comment: { connect: { id: commentId } },
    },
  });

  return commentLike;
};

export const getCommentLike = async (likeId: number, commentId: number) => {
  const commentLikes = await prisma.like.findUnique({
    where: { id: likeId, commentId: commentId },
    include: { user: true, comment: true },
  });

  return commentLikes;
};

export const getCommentLikes = async (commentId: number) => {
  const commentLikes = await prisma.like.findMany({
    where: { commentId },
    include: { user: true, comment: true },
  });

  return commentLikes;
};

export const deleteLike = async (likeId: number) => {
  const userSession = await getServerSession(authOptions);

  const like = await prisma.like.findUnique({
    where: { id: likeId },
  });

  if (userSession!.user.id !== like!.userId) {
    throw new Error("Forbidden: Operation on behalf of another user");
  }

  const deletedLike = await prisma.like.delete({
    where: { id: likeId },
  });

  return deletedLike;
};
