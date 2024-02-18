import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BsDot, BsThreeDots } from "react-icons/bs";

import { CommentProps } from "../../models/Comment";
import { PostProps } from "../../models/Post";
import { calculateTimeAgo } from "../../utils/time";
import CreateCommentFormPopup from "../Comment/CreateCommentFormPopup";
import DeleteComment from "../Comment/DeleteComment";
import Dropdown from "../Common/Dropdown";
import LikeCommentItem from "../Like/LikeCommentItem";
import LikePostItem from "../Like/LikePostItem";
import DeletePost from "../Post/DeletePost";
import UpdatePost from "../Post/UpdatePost";

type SharedItemProps = {
  userId?: User["id"];
  onPostUpdate?: (editedContent: string) => void;
  onPostDelete?: () => void;
  onCommentDelete?: (commentId: number) => void;
  alreadyLink?: boolean;
} & (
  | {
      itemType: "post";
      post: PostProps;
      comment?: never;
    }
  | {
      itemType: "comment";
      comment: CommentProps & { updatedAt?: undefined };
      post?: never;
    }
);

const SharedItem = ({
  itemType,
  userId,
  post,
  comment,
  onPostUpdate,
  onPostDelete,
  onCommentDelete,
  alreadyLink = false,
}: SharedItemProps) => {
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<number>(0);

  useEffect(() => {
    const fetchUserId = async () => {
      const session = await getSession();
      if (session?.user.id) {
        setCurrentUserId(session.user.id);
      }
    };

    fetchUserId();
  }, []);

  const showDropdown =
    (itemType === "post" && currentUserId === post.author.id) ||
    (itemType === "comment" && currentUserId === comment.user.id);

  const navigateToPostPage = () => {
    if (itemType === "post") {
      router.push(`/${post.author.username}/${post.id}`);
    }
  };

  const author = itemType === "post" ? post.author : comment.user;

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
          <Link
            href={`/${author.username}`}
            className="cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-bold text-base hover:underline">
              {author.fullName}
            </span>{" "}
            <span className="text-gray-600 text-sm hover:underline">
              @{author.username}
            </span>
          </Link>
          <BsDot className="mx-1 text-gray-500" />
          <span className="text-xs text-gray-500">
            {calculateTimeAgo(
              new Date(
                (post || comment).updatedAt || (post || comment).createdAt,
              ),
            )}
          </span>
        </div>
      </div>
      <p className="text-sm mb-1 mt-2 break-words">
        {(post || comment).content}
      </p>
    </div>
  );

  return (
    <div className="relative">
      <>
        {alreadyLink && itemType === "post" ? (
          ItemContent
        ) : itemType === "comment" ? (
          ItemContent
        ) : (
          <div onClick={navigateToPostPage}>{ItemContent}</div>
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
                  userId={userId!}
                  postId={post.id}
                  content={post.content}
                  onPostUpdate={onPostUpdate!}
                />
              )}
              {itemType === "post" && (
                <DeletePost
                  userId={userId!}
                  postId={post.id}
                  onPostDelete={onPostDelete!}
                />
              )}
              {itemType === "comment" && comment.id && (
                <DeleteComment
                  userId={userId!}
                  postId={comment.postId}
                  commentId={comment.id}
                  onCommentDelete={() => onCommentDelete?.(comment.id)}
                />
              )}
            </Dropdown>
          </div>
        )}
        <div className="absolute bottom-0 right-0 p-1 flex">
          {userId && itemType === "post" && (
            <LikePostItem userId={userId} postId={post.id} />
          )}
          {userId && itemType === "comment" && comment.id && (
            <LikeCommentItem
              userId={userId}
              postId={comment.postId}
              commentId={comment.id}
            />
          )}
          {userId && itemType === "post" && (
            <CreateCommentFormPopup userId={userId} postId={post.id} />
          )}
        </div>
      </>
    </div>
  );
};

export default SharedItem;
