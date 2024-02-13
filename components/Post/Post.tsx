"use client";

import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { Comment } from "../../models/Comment";
import { Post as PostModel } from "../../models/Post";
import {
  handleCommentCreateUtil,
  handleCommentDeleteUtil,
} from "../../utils/post/comment";
import { handleUpdatePost, handleDeletePost } from "../../utils/post/post";
import CommentItem from "../Comment/CommentItem";
import CreateCommentForm from "../Comment/CreateCommentForm";
import CommentContainer from "../Common/CommentContainer";
import PostContainer from "../Common/PostContainer";

import PostItem from "./PostItem";

interface PostProps {
  post: PostModel;
}

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  const [content, setContent] = useState(post.content);
  const [postState, setPost] = useState<PostModel | null>(post);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        const userId = session?.user.id;
        setUserId(userId);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (updatedContent: string) => {
    handleUpdatePost(post.id as number, updatedContent, setPost);
    setContent(updatedContent);
  };

  const handleDelete = async () => {
    const isSuccess = handleDeletePost(setPost);
    if (isSuccess) {
      router.back();
    }
  };

  const handleCommentCreate = async (newComment: Comment) => {
    handleCommentCreateUtil(postState, newComment, setPost);
  };

  const handleCommentDelete = (commentId: number) => {
    handleCommentDeleteUtil(postState, commentId, setPost);
  };

  const sortedComments = postState?.comment!.sort((a, b) => {
    return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
  });

  return (
    <>
      <PostContainer>
        <PostItem
          alreadyLink={true}
          userId={postState?.author?.id as number}
          postId={postState?.id as number}
          content={content}
          username={postState?.author?.username as string}
          fullName={postState?.author?.fullName as string}
          createdAt={postState?.createdAt as Date}
          updatedAt={postState?.updatedAt as Date}
          onPostUpdate={handleUpdate}
          onPostDelete={handleDelete}
        />
      </PostContainer>
      <CommentContainer>
        <CreateCommentForm
          userId={userId!}
          postId={post.id!}
          onSuccess={handleCommentCreate}
        ></CreateCommentForm>
        {sortedComments?.map((comment) => (
          <CommentItem
            key={`comment-${comment.id}`}
            userId={comment.userId}
            postId={postState!.id!}
            commentId={comment.id!}
            content={comment.content}
            fullName={comment.user?.fullName as string}
            username={comment.user?.username as string}
            createdAt={comment.createdAt as Date}
            onCommentDelete={() => {
              handleCommentDelete(comment.id!);
            }}
          />
        ))}
      </CommentContainer>
    </>
  );
};

export default Post;
