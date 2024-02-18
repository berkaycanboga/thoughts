import { PostProps } from "../../models/Post";

import { api, urls } from "./api";

export const processNewPosts = async (userId: number) => {
  try {
    const { feed } = await api.get<{
      feed: PostProps[];
    }>(urls.user(userId) + "/dashboard");

    if (!feed || !Array.isArray(feed)) {
      console.error(`Invalid response format from ${urls.user(userId)}`, feed);
      throw new Error(`Invalid response format from ${urls.user(userId)}`);
    }

    return {
      newPosts: feed,
    };
  } catch (e) {
    return { newPosts: null };
  }
};
