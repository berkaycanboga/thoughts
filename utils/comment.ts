import { Comment } from "../models/Comment";
import { Post as PostModel } from "../models/Post";

export const handleCommentCreateUtil = (
  postState: PostModel | null,
  newComment: Comment,
  setPost: React.Dispatch<React.SetStateAction<PostModel | null>>,
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
  postState: PostModel | null,
  commentId: number,
  setPost: React.Dispatch<React.SetStateAction<PostModel | null>>,
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
