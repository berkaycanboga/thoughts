import prisma from "../utils/prisma";

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  return user;
};

export const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const getLikedPostsByUserId = async (userId: number) => {
  const likedPosts = await prisma.post.findMany({
    where: {
      like: {
        some: {
          userId,
        },
      },
    },
    include: { author: true },
  });

  return likedPosts;
};

export const getPostsByUserComments = async (userId: number) => {
  const posts = await prisma.post.findMany({
    where: {
      comment: {
        some: {
          userId,
        },
      },
    },
    include: { author: true },
  });

  return posts;
};
