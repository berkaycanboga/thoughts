import { getServerSession } from "next-auth";

import { authOptions } from "../app/api/auth/[...nextauth]/options";
import prisma from "../utils/prisma";

export const followUser = async (followerId: number, followingId: number) => {
  const userSession = await getServerSession(authOptions);

  if (userSession!.user.id !== followerId) {
    throw new Error("Forbidden: Operation on behalf of another user");
  }

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
  const userSession = await getServerSession(authOptions);

  if (userSession!.user.id !== followerId) {
    throw new Error("Forbidden: Operation on behalf of another user");
  }

  const updatedUser = await prisma.user.update({
    where: { id: followerId },
    data: { following: { disconnect: { id: followingId } } },
  });

  return updatedUser;
};
