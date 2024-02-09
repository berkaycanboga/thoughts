import React, { useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import { Like } from "../../models/Like";
import { likesApiService } from "../../utils/api/like";

interface LikePostItemProps {
  userId: number;
  postId: number;
}

const LikePostItem = ({ userId, postId }: LikePostItemProps) => {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [updatingLike, setUpdatingLike] = useState(false);

  useEffect(() => {
    const fetchLikeId = async () => {
      try {
        const response = (await likesApiService.getPostLikes(
          userId,
          postId,
        )) as Like;
        const postLikes: Like[] = Object.values(response);
        const userLike = postLikes.find(
          (like: Like) => like.user.id === userId,
        );
        if (userLike) {
          setLiked(true);
          setLikeId(userLike.id);
        }
        setLikeCount(postLikes.length);
      } catch (error) {
        console.error("Error fetching like:", error);
      }
    };
    fetchLikeId();
  }, [postId, userId]);

  const handleLike = async () => {
    if (!updatingLike) {
      setUpdatingLike(true);
      try {
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        await likesApiService.createPostLike(userId, postId);
      } catch (error) {
        console.error("Error liking post:", error);
        setLiked(false);
        setLikeCount((prevCount) => prevCount);
      } finally {
        setUpdatingLike(false);
      }
    }
  };

  const handleUnlike = async () => {
    if (!updatingLike) {
      setUpdatingLike(true);
      try {
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        const response = (await likesApiService.getPostLikes(
          userId,
          postId,
        )) as Like;
        const postLikes = Object.values(response);
        const userLike = postLikes.find((like: Like) => like.user.id);
        if (userLike) {
          await likesApiService.deletePostLike(userId, postId, userLike.id);
          setLikeId(null);
        }
      } catch (error) {
        console.error("Error unliking post:", error);
        setLiked(true);
        setLikeCount((prevCount) => prevCount);
      } finally {
        setUpdatingLike(false);
      }
    }
  };

  return (
    <div className="flex items-center">
      <button
        className={`flex items-center justify-center focus:outline-none ${
          liked ? "text-red-500" : "text-gray-500"
        } ${
          updatingLike ? "pointer-events-none" : ""
        } w-7 h-7 rounded-md transition duration-300 ease-in-out hover:text-red-500 hover:bg-red-100`}
        onClick={liked ? handleUnlike : handleLike}
      >
        {liked ? (
          <BsHeartFill className="w-4 h-4" />
        ) : (
          <BsHeart className="w-4 h-4" />
        )}
      </button>
      {likeCount > 0 && (
        <span className={`text-sm ${liked ? "text-red-500" : "text-gray-500"}`}>
          {likeCount}
        </span>
      )}
    </div>
  );
};

export default LikePostItem;
