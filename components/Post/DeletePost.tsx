import React from "react";

import { postsApiService } from "../../utils/api/post";
import Delete from "../Shared/Delete";

interface DeletePostProps {
  userId: number;
  postId: number;
  onPostDelete: () => void;
}

const DeletePost = ({ userId, postId, onPostDelete }: DeletePostProps) => {
  const onDeletePost = async () => {
    await postsApiService.deletePost(userId, postId);
    if (onPostDelete) {
      onPostDelete();
    }
  };

  return (
    <Delete
      userId={userId}
      onDelete={onDeletePost}
      onClose={() => {}}
      itemName="Post"
    />
  );
};

export default DeletePost;
