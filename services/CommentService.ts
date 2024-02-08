import { CommentCRUD } from "../models/Comment";
import prisma from "../utils/prisma";

export const createComment = async (commentData: CommentCRUD) => {
  const { userId, postId, ...rest } = commentData;

  const comment = await prisma.comment.create({
    data: {
      ...rest,
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
    },
    include: { user: true },
  });

  return comment;
};

export const getCommentByPostId = async (commentId: number, postId: number) => {
  const comments = await prisma.comment.findUnique({
    where: { id: commentId, postId: postId },
    include: { user: true },
  });

  return comments;
};

export const getCommentsByPostId = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
  });

  return comments;
};

export const deleteComment = async (commentId: number) => {
  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
  });

  return deletedComment;
};
