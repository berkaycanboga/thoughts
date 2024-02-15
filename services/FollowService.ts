import prisma from "../utils/prisma";

export const followUser = async (followerId: number, followingId: number) => {
  const updatedUser = await prisma.user.update({
    where: { id: followerId },
    data: { following: { connect: { id: followingId } } },
  });

  return updatedUser;
};

export const getFollowers = async (userId: number) => {
  const followers = await prisma.user
    .findUnique({ where: { id: userId } })
    .followers();

  return followers;
};

export const getFollowings = async (userId: number) => {
  const followings = await prisma.user
    .findUnique({ where: { id: userId } })
    .following();

  return followings;
};

export const unfollowUser = async (followerId: number, followingId: number) => {
  const updatedUser = await prisma.user.update({
    where: { id: followerId },
    data: { following: { disconnect: { id: followingId } } },
  });

  return updatedUser;
};
