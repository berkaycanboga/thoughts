import React from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import {
  getUserPostsController,
  getUserFollowingPostsController,
} from "../../../controllers/PostController";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as number;
  const username = session?.user.username as string;
  const fullName = session?.user.username as string;

  const userPosts = await getUserPostsController(userId);
  const userFollowingPosts = await getUserFollowingPostsController(userId);

  const posts = [...userPosts, ...userFollowingPosts];

  return (
    <Dashboard
      userId={userId}
      posts={posts}
      username={username}
      fullName={fullName}
    />
  );
};

export default DashboardPage;
