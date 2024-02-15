import { api, urls } from "./api";

export const followApiService = {
  getFollowersByUserId: async (userId: number) => {
    return api.get(urls.follower(userId));
  },

  getFollowingByUserId: async (userId: number) => {
    return api.get(urls.following(userId));
  },

  followUser: async (userId: number) => {
    return api.post(urls.follow(userId));
  },

  unfollowUser: async (userId: number) => {
    return api.delete(urls.follow(userId));
  },
};
