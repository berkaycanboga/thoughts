import React from "react";

import { LikeItemProps } from "../../models/Like";

import Like from "./Like";

const LikePostItem = ({ userId, postId }: LikeItemProps) => {
  return <Like userId={userId} postId={postId} />;
};

export default LikePostItem;
