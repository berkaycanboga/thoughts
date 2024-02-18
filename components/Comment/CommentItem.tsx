import React from "react";

import { CommentProps } from "../../models/Comment";
import SharedItem from "../Shared/SharedItem";

interface CommentItemProps extends CommentProps {
  userId: number;
  onCommentDelete: (commentId: number) => void;
}

const CommentItem = ({
  userId,
  onCommentDelete,
  ...comment
}: CommentItemProps) => {
  return (
    <SharedItem
      itemType="comment"
      userId={userId}
      onCommentDelete={onCommentDelete}
      comment={{ ...comment, userId }}
    />
  );
};

export default CommentItem;
