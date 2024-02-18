import { PostProps } from "../models/Post";

export const handleUpdatePost = (
  postId: number,
  updatedContent: string,
  setPost: React.Dispatch<React.SetStateAction<PostProps | null>>,
) => {
  setPost((prevPost) => ({
    ...prevPost!,
    content: updatedContent,
  }));
};

export const handleUpdatePostFeed = async (
  postId: number,
  editedContent: string,
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === postId ? { ...post, content: editedContent } : post,
    ),
  );
};

export const handleDeletePostFeed = async (
  postId: number,
  posts: PostProps[],
  setPosts: React.Dispatch<React.SetStateAction<PostProps[]>>,
) => {
  setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
};

export const handleDeletePost = (
  setPost: React.Dispatch<React.SetStateAction<PostProps | null>>,
) => {
  setPost(null);
  return true;
};
