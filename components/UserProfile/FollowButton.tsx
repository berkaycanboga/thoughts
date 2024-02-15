import { Session } from "next-auth";
import React from "react";

import { followApiService } from "../../utils/api/follow";

interface FollowButtonProps {
  userId: number;
  session: Session;
  followerList: {
    userId: number;
    username: string;
    fullName: string;
  }[];
  setFollowerList: React.Dispatch<
    React.SetStateAction<
      {
        userId: number;
        username: string;
        fullName: string;
      }[]
    >
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

const FollowButton = ({
  userId,
  session,
  followerList,
  setFollowerList,
  setLoading,
  loading,
}: FollowButtonProps) => {
  const followOrUnfollow = async () => {
    if (!session) {
      return;
    }

    setLoading(true);

    try {
      const isFollowing = followerList.some(
        (follower) => follower.userId === session.user.id,
      );

      if (isFollowing) {
        await followApiService.unfollowUser(userId);
        const updatedFollowerList = followerList.filter(
          (follower) => follower.userId !== session.user.id,
        );
        setFollowerList(updatedFollowerList);
      } else {
        await followApiService.followUser(userId);
        const updatedFollowerList = [
          ...followerList,
          {
            userId: session.user.id,
            username: session.user.username,
            fullName: session.user.fullName,
          },
        ];
        setFollowerList(updatedFollowerList);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={followOrUnfollow}
      disabled={loading}
      className="px-4 py-2 rounded bg-cyan-500 text-white transition duration-300 hover:bg-cyan-600"
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
        </div>
      ) : followerList.some(
          (follower) => follower.username === session.user.username,
        ) ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </button>
  );
};

export default FollowButton;
