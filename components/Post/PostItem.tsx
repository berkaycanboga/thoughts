import React from "react";
import { BsThreeDots, BsDot } from "react-icons/bs";

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
      </div>

      <p className="text-sm mb-1 mt-2">{content}</p>
    </div>
  );
};

export default PostItem;
