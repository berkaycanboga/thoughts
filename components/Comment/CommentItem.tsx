import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots, BsDot } from "react-icons/bs";

import { commentsApiService } from "../../utils/api/comment";
import { calculateTimeAgo } from "../../utils/time";
import Dropdown from "../Common/Dropdown";

import DeleteComment from "./DeleteComment";

interface CommentItemProps {
  userId: number;
  postId: number;
  commentId: number;
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  onCommentDelete: (commentId: number) => void;
}

const CommentItem = ({
  userId,
  postId,
  commentId,
  content,
  fullName,
  username,
  createdAt,
  onCommentDelete,
}: CommentItemProps) => {
  const timeAgo = calculateTimeAgo(createdAt);
  const [commentOwner, setCommentOwner] = useState<number | null>(null);

  useEffect(() => {
    const fetchCommentOwner = async () => {
      try {
        const session = await getSession();
        const currentUserId = session?.user.id;

        await commentsApiService.getCommentByPostId(postId, commentId);

        if (currentUserId === userId) {
          setCommentOwner(userId);
        }
      } catch (error) {
        console.error("Error fetching comment details:", error);
      }
    };

    fetchCommentOwner();
  }, [userId, postId, commentId]);

  const isOwner = commentOwner === userId;
  const showDropdown = isOwner;

  return (
    <div className="p-3 bg-white rounded-md shadow-md h-auto min-h-32 mt-4">
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

        <div className="absolute top-0 right-0">
          {showDropdown && (
            <Dropdown
              trigger={
                <div className="cursor-pointer flex items-center justify-center text-gray-500 rounded-md text-xl w-6 h-6 hover:bg-gray-100">
                  <BsThreeDots />
                </div>
              }
            >
              <DeleteComment
                userId={userId}
                postId={postId}
                commentId={commentId}
                onCommentDelete={() => onCommentDelete(commentId)}
              />
            </Dropdown>
          )}
        </div>
      </div>

      <p className="text-sm mb-1 mt-2">{content}</p>
    </div>
  );
};

export default CommentItem;
