"use client";

import React, { useEffect, useState } from "react";

import { Post } from "../../models/Post";
import { postsApiService } from "../../utils/api/post";
import {
  handleDeletePostFeed,
  handleUpdatePostFeed,
} from "../../utils/post/post";
import PostContainer from "../Common/PostContainer";
import PostItem from "../Post/PostItem";

interface UserProfileProps {
  userId: number;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const getPosts = await postsApiService.getUserPosts(userId);
        const userPosts = Object.values(getPosts).map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        }));

        setUserPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  const handleUpdatePost = async (postId: number, editedContent: string) => {
    handleUpdatePostFeed(postId, editedContent, userPosts, setUserPosts);
  };

  const handleDeletePost = async (postId: number) => {
    handleDeletePostFeed(postId, userPosts, setUserPosts);
  };

  const sortedUserPosts = userPosts.slice().sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <PostContainer>
      {[...sortedUserPosts].map((post) => (
        <React.Fragment key={post.id}>
          <PostItem
            userId={post.author?.id as number}
            postId={post.id as number}
            content={post.content}
            username={post.author?.username as string}
            fullName={post.author?.fullName as string}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            onPostUpdate={(updatedContent) =>
              handleUpdatePost(post.id as number, updatedContent)
            }
            onPostDelete={() => handleDeletePost(post.id as number)}
          />
        </React.Fragment>
      ))}
    </PostContainer>
  );
};

export default UserProfile;
