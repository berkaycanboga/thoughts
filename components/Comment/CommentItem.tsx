import React from "react";

import SharedItem from "../Shared/SharedItem";

interface CommentItemProps {
  userId: number;
  postId: number;
  commentId: number;
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  onCommentDelete: (commentId: number) => void;
}

const CommentItem = ({
  userId,
  postId,
  commentId,
  content,
  fullName,
  username,
  createdAt,
  onCommentDelete,
}: CommentItemProps) => {
  return (
    <SharedItem
      itemType="comment"
      userId={userId}
      postId={postId}
      commentId={commentId}
      content={content}
      fullName={fullName}
      username={username}
      createdAt={createdAt}
      onCommentDelete={onCommentDelete}
    />
  );
};

export default CommentItem;
