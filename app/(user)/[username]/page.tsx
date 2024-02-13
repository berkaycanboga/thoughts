import React from "react";

import UserProfile from "../../../components/UserProfile/UserProfile";
import { getUserIdByUsernameController } from "../../../controllers/UserController";

const UserProfilePage = async (ctx: { params: { username: string } }) => {
  const username = ctx.params.username;
  const userId = await getUserIdByUsernameController(username);

  return <UserProfile userId={userId!} />;
};

export default UserProfilePage;
