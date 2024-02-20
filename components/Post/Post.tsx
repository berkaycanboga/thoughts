"use client";

import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { CommentProps } from "../../models/Comment";
import { PostProps } from "../../models/Post";
import {
  handleCommentCreateUtil,
  handleCommentDeleteUtil,
} from "../../utils/comment";
import { handleUpdatePost, handleDeletePost } from "../../utils/post";
import CommentItem from "../Comment/CommentItem";
import CreateCommentForm from "../Comment/CreateCommentForm";
import CommentContainer from "../Common/CommentContainer";
import PostContainer from "../Common/PostContainer";

import PostItem from "./PostItem";

interface PostPageProps {
  post: PostProps;
}

const Post = ({ post }: PostPageProps) => {
  const router = useRouter();
  const [postState, setPost] = useState<PostProps | null>(post);
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

  const handleUpdate = (updatedContent: string) => {
    handleUpdatePost(post.id as number, updatedContent, setPost);
  };
  const handleDelete = () => {
    const isSuccess = handleDeletePost(setPost);
    if (isSuccess) {
      router.back();
    }
  };

  const handleCommentCreate = async (newComment: CommentProps) => {
    handleCommentCreateUtil(postState, newComment, setPost);
  };

  const handleCommentDelete = (commentId: number) => {
    handleCommentDeleteUtil(postState, commentId, setPost);
  };

  const sortedComments = postState?.comment.sort((a, b) => {
    return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
  });

  return (
    <>
      <PostContainer>
        <PostItem
          alreadyLink={true}
          {...post}
          userId={userId}
          content={postState!.content}
          onPostUpdate={(updatedContent) => handleUpdate(updatedContent)}
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
            {...comment}
            userId={comment.userId}
            postId={postState!.id!}
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
