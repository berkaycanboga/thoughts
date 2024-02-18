import { CommentProps } from "../models/Comment";
import { PostProps } from "../models/Post";

export const handleCommentCreateUtil = (
  postState: PostProps | null,
  newComment: CommentProps,
  setPost: React.Dispatch<React.SetStateAction<PostProps | null>>,
) => {
  if (postState) {
    const newCommentWithDates = {
      ...newComment,
      createdAt: new Date(newComment.createdAt as Date),
    };
    setPost((prevPost) => ({
      ...prevPost!,
      comment: [newCommentWithDates, ...(prevPost!.comment || [])],
    }));
  }
};

export const handleCommentDeleteUtil = (
  postState: PostProps | null,
  commentId: number,
  setPost: React.Dispatch<React.SetStateAction<PostProps | null>>,
) => {
  if (postState) {
    setPost((prevPost) => ({
      ...prevPost!,
      comment: (prevPost!.comment || []).filter(
        (comment) => comment.id !== commentId,
      ),
    }));
  }
};
