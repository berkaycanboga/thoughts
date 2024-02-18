import { User } from "@prisma/client";
import React from "react";

import { PostProps } from "../../models/Post";
import SharedItem from "../Shared/SharedItem";

interface PostItemProps extends PostProps {
  userId?: User["id"];
  onPostUpdate: (editedContent: string) => void;
  onPostDelete: () => void;
  alreadyLink?: boolean;
}

const PostItem = ({
  onPostUpdate,
  onPostDelete,
  alreadyLink = false,
  userId,
  ...post
}: PostItemProps) => {
  return (
    <SharedItem
      post={post}
      userId={userId}
      itemType="post"
      onPostUpdate={onPostUpdate}
      onPostDelete={onPostDelete}
      alreadyLink={alreadyLink}
    />
  );
};

export default PostItem;
