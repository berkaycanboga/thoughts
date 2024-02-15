import Link from "next/link";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";

import { commentsApiService } from "../../utils/api/comment";
import { postsApiService } from "../../utils/api/post";
import { calculateTimeAgo } from "../../utils/time";
import CreateCommentFormPopup from "../Comment/CreateCommentFormPopup";
import DeleteComment from "../Comment/DeleteComment";
import Dropdown from "../Common/Dropdown";
import LikeCommentItem from "../Like/LikeCommentItem";
import LikePostItem from "../Like/LikePostItem";
import DeletePost from "../Post/DeletePost";
import LoadingPlaceholder from "../Post/PlaceholderPost";
import UpdatePost from "../Post/UpdatePost";

interface SharedItemProps {
  itemType: "post" | "comment";
  userId: number;
  postId: number;
  commentId?: number;
  content: string;
  fullName: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date;
  onPostUpdate?: (editedContent: string) => void;
  onPostDelete?: () => void;
  onCommentDelete?: (commentId: number) => void;
  alreadyLink?: boolean;
  onChildComponentsComplete?: () => void;
}

const SharedItem = ({
  itemType,
  userId,
  postId,
  commentId,
  content,
  fullName,
  username,
  createdAt,
  updatedAt,
  onPostUpdate,
  onPostDelete,
  onCommentDelete,
  alreadyLink = false,
  onChildComponentsComplete,
}: SharedItemProps) => {
  const [childComponentsComplete, setChildComponentsComplete] = useState(false);
  const [owner, setOwner] = useState<number | null>(null);

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const session = await getSession();
        const currentUserId = session?.user.id;

        if (itemType === "post") {
          await postsApiService.getPost(userId, postId);
        } else if (itemType === "comment" && commentId) {
          await commentsApiService.getCommentByPostId(postId, commentId);
        }

        if (currentUserId === userId) {
          setOwner(userId);
        }
      } catch (error) {
        console.error(`Error fetching ${itemType} details:`, error);
      } finally {
        setChildComponentsComplete(true);
      }
    };

    fetchOwner();
  }, [
    itemType,
    userId,
    postId,
    commentId,
    updatedAt,
    onChildComponentsComplete,
  ]);

  const isLoading = !childComponentsComplete;
  const isOwner = owner === userId;
  const showDropdown = isOwner;

  const itemContentClass =
    itemType === "post"
      ? !alreadyLink
        ? "p-3 bg-white rounded-md shadow-md h-auto min-h-40 mt-4 cursor-pointer transition duration-300 hover:bg-gray-100"
        : "p-3 bg-white rounded-md shadow-md h-auto min-h-40 mt-4"
      : "p-3 bg-white rounded-md shadow-md h-auto min-h-32 mt-4";

  const ItemContent = (
    <div className={itemContentClass}>
      <div className="text-lg mb-1">
        <div className="flex items-center">
          <Link href={`/${username}`}>
            <span className="font-bold text-base hover:underline">
              {fullName}
            </span>{" "}
            <span className="text-gray-600 text-sm hover:underline">
              @{username}
            </span>
          </Link>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-xs text-gray-500">
            {calculateTimeAgo(createdAt, updatedAt)}
          </span>
        </div>
      </div>
      <p className="text-sm mb-1 mt-2 break-words">{content}</p>
    </div>
  );

  return (
    <div className="relative">
      {isLoading && <LoadingPlaceholder />}
      {!isLoading && (
        <>
          {alreadyLink && itemType === "post" ? (
            ItemContent
          ) : itemType === "comment" ? (
            ItemContent
          ) : (
            <Link href={`/${username}/${postId}`}>{ItemContent}</Link>
          )}
          {showDropdown && (
            <div className="absolute top-0 right-0 mt-2 mr-2">
              <Dropdown
                trigger={
                  <div className="cursor-pointer flex items-center justify-center text-gray-500 rounded-md text-xl w-7 h-7">
                    <BsThreeDots />
                  </div>
                }
              >
                {itemType === "post" && (
                  <UpdatePost
                    userId={userId}
                    postId={postId}
                    content={content}
                    onPostUpdate={onPostUpdate!}
                  />
                )}
                {itemType === "post" && (
                  <DeletePost
                    userId={userId}
                    postId={postId}
                    onPostDelete={onPostDelete!}
                  />
                )}
                {itemType === "comment" && commentId && (
                  <DeleteComment
                    userId={userId}
                    postId={postId}
                    commentId={commentId}
                    onCommentDelete={() => onCommentDelete?.(commentId)}
                  />
                )}
              </Dropdown>
            </div>
          )}
          <div className="absolute bottom-0 right-0 p-1 flex">
            {itemType === "post" && (
              <LikePostItem userId={userId} postId={postId} />
            )}
            {itemType === "comment" && commentId && (
              <LikeCommentItem
                userId={userId}
                postId={postId}
                commentId={commentId}
              />
            )}
            {itemType === "post" && (
              <CreateCommentFormPopup userId={userId} postId={postId} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedItem;
