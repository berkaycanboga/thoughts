import { Post } from "../../models/Post";

import { api, urls } from "./api";

export const processNewPosts = async (
  userId: number,
  getMainFeed: () => Post[],
  setNewPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setShowNewPosts: React.Dispatch<React.SetStateAction<boolean>>,
  setMainFeed: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
  const response = await api.get<{ combinedPosts: Post[] }>(urls.user(userId));
  const data = response.combinedPosts;

  console.log(data);

  if (Array.isArray(data)) {
    const newPostsData = data.filter(
      (newPost: Post) =>
        !getMainFeed().some((existingPost) => existingPost.id === newPost.id),
    );

    if (newPostsData.length > 0) {
      const newPostsWithDates = newPostsData.map((post: Post) => ({
        ...post,
        createdAt: new Date(post.createdAt as Date),
        updatedAt: new Date(post.updatedAt as Date),
      }));

      const newPostsByCurrentUser = newPostsWithDates.filter(
        (post: Post) => post.author?.id === userId,
      );

      setMainFeed((prevMainFeed) => [
        ...newPostsByCurrentUser,
        ...prevMainFeed,
      ]);

      const remainingNewPosts = newPostsWithDates.filter(
        (post: Post) => post.author?.id !== userId,
      );

      setNewPosts(remainingNewPosts);
      setShowNewPosts(false);
    }
  } else {
    console.error(`Invalid response format from ${urls.user(userId)}:`, data);
  }
};
