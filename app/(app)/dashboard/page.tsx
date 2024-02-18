import { getServerSession } from "next-auth";
import React from "react";

import Dashboard from "../../../components/Dashboard/Dashboard";
import { getFeed } from "../../../controllers/PostController";
import { authOptions } from "../../api/auth/[...nextauth]/options";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id as number;
  const username = session?.user.username as string;
  const fullName = session?.user.username as string;

  const feed = await getFeed(userId);

  return (
    <Dashboard
      userId={userId}
      posts={feed}
      username={username}
      fullName={fullName}
    />
  );
};

export default DashboardPage;
