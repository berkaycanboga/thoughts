import {
  followUser,
  getFollowers,
  getFollowings,
  unfollowUser,
} from "../services/FollowService";

export const followUserController = async (
  followerId: number,
  followingId: number,
) => {
  return followUser(followerId, followingId);
};

export async function getFollowersController(userId: number) {
  return await getFollowers(userId);
}

export async function getFollowingsController(userId: number) {
  return await getFollowings(userId);
}

export const unfollowUserController = async (
  followerId: number,
  followingId: number,
) => {
  return unfollowUser(followerId, followingId);
};
