import prisma from "../utils/prisma";

export const getUserIdByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const updateUser = async (
  userId: number,
  updatedData: { username?: string; fullName?: string; email?: string },
) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { ...updatedData },
  });

  return updatedUser;
};

export const deleteUser = async (userId: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  return deletedUser;
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
