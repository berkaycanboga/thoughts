"use client";

import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots, BsDot } from "react-icons/bs";

import { postsApiService } from "../../utils/api/post";
import { calculateTimeAgo } from "../../utils/time";
import Dropdown from "../Common/Dropdown";

import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";

interface PostItemProps {
  userId: number;
  postId: number;
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  onPostUpdate: (editedContent: string) => void;
  onPostDelete: () => void;
}

const PostItem = ({
  userId,
  postId,
  content,
  fullName,
  username,
  createdAt,
  updatedAt,
  onPostUpdate,
  onPostDelete,
}: PostItemProps) => {
  const timeAgo = calculateTimeAgo(createdAt, updatedAt);
  const [postOwner, setPostOwner] = useState<number | null>(null);

  useEffect(() => {
    const fetchPostOwner = async () => {
      try {
        const session = await getSession();
        const currentUserId = session?.user.id;

        await postsApiService.getPost(userId, postId);

        if (currentUserId === userId) {
          setPostOwner(userId);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostOwner();
  }, [userId, postId]);

  const isOwner = postOwner === userId;
  const showDropdown = isOwner;

  return (
    <div className="relative">
      <div className="text-lg mb-1">
        <div className="flex items-center">
          <span className="font-bold text-base">{fullName}</span>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-gray-600 text-sm">@{username}</span>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
      </div>

      <div className="absolute top-0 right-0 mt-2 mr-2">
        {showDropdown && (
          <Dropdown
            trigger={
              <BsThreeDots className="cursor-pointer text-gray-500 rounded-md text-xl" />
            }
          >
            <UpdatePost
              userId={userId}
              postId={postId}
              content={content}
              onPostUpdate={onPostUpdate}
            />
            <DeletePost
              userId={userId}
              postId={postId}
              onPostDelete={onPostDelete}
            />
          </Dropdown>
        )}
      </div>

      <p className="text-sm mb-1 mt-2">{content}</p>
    </div>
  );
};

export default PostItem;
