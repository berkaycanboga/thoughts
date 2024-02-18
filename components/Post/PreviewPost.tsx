import React from "react";
import { BsDot } from "react-icons/bs";

import { calculateTimeAgo } from "../../utils/time";

interface PreviewPostProps {
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

const PreviewPost = ({
  content,
  fullName,
  username,
  createdAt,
}: PreviewPostProps) => {
  const timeAgo = calculateTimeAgo(createdAt);

  return (
    <div className="relative mt-2">
      <div className="p-3 bg-white rounded-md shadow-md min-h-40">
        <div className="text-lg mb-1">
          <div className="flex items-center">
            <span className="font-bold text-base">{fullName}</span>
            <BsDot className="mx-1 text-gray-500" />
            <span className="text-gray-600 text-sm">@{username}</span>
            <BsDot className="mx-1 text-gray-500" />
            <span className="text-xs text-gray-500">{timeAgo} (Updated)</span>
          </div>
        </div>

        <p className="text-sm mb-1 break-words">{content}</p>
      </div>
    </div>
  );
};

export default PreviewPost;
