import { Post as PostModel } from "../../models/Post";

export const handleUpdatePost = (
  postId: number,
  updatedContent: string,
  setPost: React.Dispatch<React.SetStateAction<PostModel | null>>,
) => {
  setPost((prevPost) => ({
    ...prevPost!,
    content: updatedContent,
  }));
};

export const handleUpdatePostFeed = async (
  postId: number,
  editedContent: string,
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
) => {
  setPosts((prevPosts) =>
    prevPosts.map((post) =>
      post.id === postId ? { ...post, content: editedContent } : post,
    ),
  );
};

export const handleDeletePostFeed = async (
  postId: number,
  posts: PostModel[],
  setPosts: React.Dispatch<React.SetStateAction<PostModel[]>>,
) => {
  setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
};

export const handleDeletePost = (
  setPost: React.Dispatch<React.SetStateAction<PostModel | null>>,
) => {
  setPost(null);
  return true;
};
