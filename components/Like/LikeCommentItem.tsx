import React from "react";

import { LikeItemProps } from "../../models/Like";

import Like from "./Like";

const LikeCommentItem = ({ userId, postId, commentId }: LikeItemProps) => {
  return <Like userId={userId} postId={postId} commentId={commentId} />;
};

export default LikeCommentItem;
