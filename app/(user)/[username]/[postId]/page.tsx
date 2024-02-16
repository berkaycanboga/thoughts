import React from "react";

import Post from "../../../../components/Post/Post";
import { getPostByIdController } from "../../../../controllers/PostController";
import NotFound from "../../../not-found";

const PostPage = async (ctx: { params: { postId: string } }) => {
  const postId = parseInt(ctx.params.postId, 10);

  if (!postId) {
    return <NotFound />;
  }

  const userPost = await getPostByIdController(postId);

  return <Post post={userPost!} />;
};

export default PostPage;
