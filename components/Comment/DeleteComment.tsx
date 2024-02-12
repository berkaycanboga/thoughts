import React from "react";

import { commentsApiService } from "../../utils/api/comment";
import Delete from "../Common/Delete";

interface DeleteCommentProps {
  userId: number;
  postId: number;
  commentId: number;
  onCommentDelete: () => void;
}

const DeleteComment = ({
  userId,
  postId,
  commentId,
  onCommentDelete,
}: DeleteCommentProps) => {
  const onDeleteComment = async () => {
    await commentsApiService.deleteComment(userId, postId, commentId);
    if (onCommentDelete) {
      onCommentDelete();
    }
  };

  return (
    <Delete
      userId={userId}
      onDelete={onDeleteComment}
      onClose={() => {}}
      itemName="Comment"
    />
  );
};

export default DeleteComment;
