import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";

import { User } from "../../models/User";
import { followApiService } from "../../utils/api/follow";
import { userApiService } from "../../utils/api/user";

import FollowButton from "./FollowButton";
import ListPopup from "./ListPopup";

interface UserInfoProps {
  userId: number;
}

const UserInfo = ({ userId }: UserInfoProps) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [followerList, setFollowerList] = useState<
    { userId: number; username: string; fullName: string }[]
  >([]);
  const [followingList, setFollowingList] = useState<
    { username: string; fullName: string }[]
  >([]);
  const [showFollowerPopup, setShowFollowerPopup] = useState(false);
  const [showFollowingPopup, setShowFollowingPopup] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

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
            userId: follower.id,
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

  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      setSession(session);
    };

    getSessionData();
  }, []);

  useEffect(() => {
    if (session && userData && session.user.id === userData.id) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [session, userData]);

  useEffect(() => {
    if (userData) {
      setButtonVisible(true);
    }
  }, [userData]);

  const togglePopup = (
    popupState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    popupState((prevState) => !prevState);
  };

  return (
    <div className="flex items-start py-2 border-b mb-2 ml-auto relative">
      <div className="mr-2 flex-grow">
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

      {buttonVisible && !isOwnProfile && session && (
        <div className="mt-auto">
          <FollowButton
            userId={userId}
            session={session}
            followerList={followerList}
            setFollowerList={setFollowerList}
            setLoading={setLoading}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};

export default UserInfo;
