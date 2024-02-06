"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Post as PostModel } from "../../models/Post";
import { handleUpdatePost, handleDeletePost } from "../../utils/postUtils";
import PostContainer from "../Common/PostContainer";

import PostItem from "./PostItem";

interface PostProps {
  post: PostModel;
}

const Post = ({ post }: PostProps) => {
  const router = useRouter();
  const [content, setContent] = useState(post.content);
  const [postState, setPost] = useState<PostModel | null>(post);

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

  return (
    <PostContainer>
      <div className="p-3 bg-white rounded-md shadow-md h-auto min-h-32">
        <PostItem
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
      </div>
    </PostContainer>
  );
};

export default Post;
