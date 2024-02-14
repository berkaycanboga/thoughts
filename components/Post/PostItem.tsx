import React from "react";

import SharedItem from "../Shared/SharedItem";

interface PostItemProps {
  userId: number;
  postId: number;
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  onPostUpdate: (editedContent: string) => void;
  onPostDelete: () => void;
  alreadyLink?: boolean;
}

const PostItem = ({
  userId,
  postId,
  content,
  fullName,
  username,
  createdAt,
  updatedAt,
  onPostUpdate,
  onPostDelete,
  alreadyLink = false,
}: PostItemProps) => {
  return (
    <SharedItem
      itemType="post"
      userId={userId}
      postId={postId}
      content={content}
      fullName={fullName}
      username={username}
      createdAt={createdAt}
      updatedAt={updatedAt}
      onPostUpdate={onPostUpdate}
      onPostDelete={onPostDelete}
      alreadyLink={alreadyLink}
    />
  );
};

export default PostItem;
