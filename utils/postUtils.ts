import { Post as PostModel } from "../models/Post";

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

export const handleDeletePost = (
  setPost: React.Dispatch<React.SetStateAction<PostModel | null>>,
) => {
  setPost(null);
  return true;
};
