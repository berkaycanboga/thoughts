import axios, { AxiosResponse } from "axios";
import { Post } from "../../models/Post";

const BASE_URL = "http://localhost:3000/api";

const handleResponse = async <T>(
  responsePromise: Promise<AxiosResponse<T>>,
) => {
  try {
    const response = await responsePromise;
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

export const createPostApi = async (userId: number, content: string) => {
  try {
    const response = await handleResponse(
      axios.post<Post>(`${BASE_URL}/user/${userId}/posts`, { content }),
    );
    return response;
  } catch (error) {
    console.error("Error creating user post:", error);
    throw error;
  }
};

export const getPostApi = async (userId: number, postId: number) => {
  try {
    const response = await handleResponse(
      axios.get<Post>(`${BASE_URL}/user/${userId}/post/${postId}`),
    );
    return response;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

export const getUserPostsApi = async (userId: number) => {
  try {
    const response = await handleResponse(
      axios.get<Post[]>(`${BASE_URL}/user/${userId}/posts`),
    );
    return response;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
};

export const updatePostApi = async (
  userId: number,
  postId: number,
  content: string,
) => {
  try {
    const response = await handleResponse(
      axios.put<Post>(`${BASE_URL}/user/${userId}/posts/${postId}`, {
        content,
      }),
    );
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePostApi = async (userId: number, postId: number) => {
  try {
    const response = await handleResponse(
      axios.delete<Post>(`${BASE_URL}/user/${userId}/posts/${postId}`),
    );
    return response;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const fetchNewPosts = async (
  userId: number,
  getMainFeed: () => Post[],
  setNewPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  setShowNewPosts: React.Dispatch<React.SetStateAction<boolean>>,
  setMainFeed: React.Dispatch<React.SetStateAction<Post[]>>,
) => {
  try {
    const response = await handleResponse(
      axios.get<{ combinedPosts: Post[] }>(`${BASE_URL}/user/${userId}`),
    );
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
      console.error("Invalid response format:", data);
    }
  } catch (error) {
    console.error("Error fetching new posts:", error);
  }
};
