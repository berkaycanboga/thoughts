import Link from "next/link";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";

import { postsApiService } from "../../utils/api/post";
import { calculateTimeAgo } from "../../utils/time";
import CreateCommentFormPopup from "../Comment/CreateCommentFormPopup";
import Dropdown from "../Common/Dropdown";
import LikePostItem from "../Like/LikePostItem";

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
  alreadyLink?: boolean;
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
  alreadyLink = false,
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

  const postContentClass = alreadyLink
    ? "p-3 bg-white rounded-md shadow-md h-auto min-h-40 mt-4"
    : "p-3 bg-white rounded-md shadow-md h-auto min-h-40 mt-4 cursor-pointer transition duration-300 hover:bg-gray-100";

  const PostContent = (
    <div className={postContentClass}>
      <div className="text-lg mb-1">
        <div className="flex items-center">
          <span className="font-bold text-base">{fullName}</span>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-gray-600 text-sm">@{username}</span>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
      </div>

      <p className="text-sm mb-1 mt-2 break-words">{content}</p>
    </div>
  );

  return (
    <div className="relative">
      {alreadyLink ? (
        PostContent
      ) : (
        <Link href={`/${username}/${postId}`}>{PostContent}</Link>
      )}
      {showDropdown && (
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Dropdown
            trigger={
              <div className="cursor-pointer flex items-center justify-center text-gray-500 rounded-md text-xl w-7 h-7 hover:bg-gray-100">
                <BsThreeDots />
              </div>
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
      )}
      <div className="absolute bottom-0 right-0 p-1 flex">
        <LikePostItem userId={userId} postId={postId} />
        <CreateCommentFormPopup userId={userId} postId={postId} />
      </div>
    </div>
  );
};

export default PostItem;
