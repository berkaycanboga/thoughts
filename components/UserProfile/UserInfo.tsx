import Link from "next/link";
import React, { useEffect, useState } from "react";

import { User } from "../../models/User";
import { followApiService } from "../../utils/api/follow";
import { userApiService } from "../../utils/api/user";
import Popup from "../Common/Popup";

interface UserInfoProps {
  userId: number;
}

interface ListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  list: { username: string; fullName: string }[];
}

const ListPopup = ({ isOpen, onClose, title, list }: ListPopupProps) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      content={
        <ul className="divide-y divide-gray-300">
          {list.map((item, index) => (
            <li key={index} className="py-2 px-4">
              <Link
                href={`/${item.username}`}
                className="rounded-md hover:bg-gray-100 transition duration-300 block p-2"
              >
                <p className="font-semibold">{item.fullName}</p>
                <p className="text-gray-500">@{item.username}</p>
              </Link>
            </li>
          ))}
        </ul>
      }
      width="w-full max-w-md"
      height="h-auto"
    />
  );
};

const UserInfo = ({ userId }: UserInfoProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [followerList, setFollowerList] = useState<
    { username: string; fullName: string }[]
  >([]);
  const [followingList, setFollowingList] = useState<
    { username: string; fullName: string }[]
  >([]);
  const [showFollowerPopup, setShowFollowerPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = (await userApiService.getUser(userId)) as User;
        setUserData(userResponse);

        const followersResponse = (await followApiService.getFollowersByUserId(
          userId,
        )) as User[];
        const followingResponse = (await followApiService.getFollowingByUserId(
          userId,
        )) as User[];

        const followers = Object.values(followersResponse);
        const following = Object.values(followingResponse);

        setFollowerList(
          followers.map((follower: User) => ({
            username: follower.username,
            fullName: follower.fullName,
          })),
        );
        setFollowingList(
          following.map((followingUser: User) => ({
            username: followingUser.username,
            fullName: followingUser.fullName,
          })),
        );
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const togglePopup = (
    popupState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    popupState((prevState) => !prevState);
  };

  return (
    <div className="flex items-center py-2 border-b mb-2 ml-auto">
      <div className="mr-2">
        {userData && (
          <>
            <p className="font-bold text-lg mb-0">{userData.fullName}</p>
            <p className="text-gray-500 mb-0">@{userData.username}</p>
          </>
        )}
        {(followerList.length > 0 || followingList.length > 0) && (
          <div className="flex">
            {followerList.length > 0 && (
              <p
                className="text-gray-500 mb-0 cursor-pointer hover:underline mr-4"
                onClick={() => togglePopup(setShowFollowerPopup)}
              >
                Followers: {followerList.length}
              </p>
            )}
            {followingList.length > 0 && (
              <p
                className="text-gray-500 mb-0 cursor-pointer hover:underline"
                onClick={() => togglePopup(setShowFollowingPopup)}
              >
                Following: {followingList.length}
              </p>
            )}
          </div>
        )}
      </div>

      <ListPopup
        isOpen={showFollowerPopup}
        onClose={() => togglePopup(setShowFollowerPopup)}
        title="Followers"
        list={followerList}
      />

      <ListPopup
        isOpen={showFollowingPopup}
        onClose={() => togglePopup(setShowFollowingPopup)}
        title="Following"
        list={followingList}
      />
    </div>
  );
};

export default UserInfo;
