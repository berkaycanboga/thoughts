import { getServerSession } from "next-auth";
import React from "react";

import Post from "../../../../components/Post/Post";
import { getPostByIdController } from "../../../../controllers/PostController";
import { authOptions } from "../../../api/auth/[...nextauth]/options";

const PostPage = async (ctx: { params: { postId: string } }) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as number;
  const postId = parseInt(ctx.params.postId, 10);

  const userPost = await getPostByIdController(postId, userId);

  return <Post post={userPost!} />;
};

export default PostPage;
