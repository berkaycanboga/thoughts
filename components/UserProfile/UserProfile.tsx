"use client";

import React, { useEffect, useState } from "react";

import { Post } from "../../models/Post";
import { postsApiService } from "../../utils/api/post";
import { userApiService } from "../../utils/api/user";
import {
  handleDeletePostFeed,
  handleUpdatePostFeed,
} from "../../utils/post/post";
import PostContainer from "../Common/PostContainer";
import PostItem from "../Post/PostItem";

import UserInfo from "./UserInfo";

interface UserProfileProps {
  userId: number;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [activeButton, setActiveButton] = useState<string>("posts");
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    posts: 0,
    replies: 0,
    likes: 0,
  });

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        let fetchedPosts: Post[];

        switch (activeButton) {
          case "replies":
            fetchedPosts = await userApiService.getPostsByUserComments(userId);
            break;
          case "likes":
            fetchedPosts = await userApiService.getLikedPostsByUserId(userId);
            break;
          default:
            fetchedPosts = await postsApiService.getUserPosts(userId);
        }

        const updatedUserPosts = Object.values(fetchedPosts).map((post) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt),
        }));

        setUserPosts(updatedUserPosts);
        setCounts((prevCounts) => ({
          ...prevCounts,
          [activeButton]: updatedUserPosts.length,
        }));
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, [userId, activeButton]);

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
    <>
      <PostContainer>
        <UserInfo />
        <div className="mb-4">
          {activeButton === "posts" && counts.posts > 0 && (
            <p className="text-gray-600">{counts.posts} Posts</p>
          )}
          {activeButton === "replies" && counts.replies > 0 && (
            <p className="text-gray-600">{counts.replies} Replies</p>
          )}
          {activeButton === "likes" && counts.likes > 0 && (
            <p className="text-gray-600">{counts.likes} Likes</p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={`switch-button ${
              activeButton === "posts"
                ? "bg-cyan-500 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-cyan-600 transition duration-300 px-4 py-2 rounded`}
            onClick={() => setActiveButton("posts")}
          >
            Posts
          </button>
          <button
            className={`switch-button ${
              activeButton === "replies"
                ? "bg-cyan-500 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-cyan-600 transition duration-300 px-4 py-2 rounded`}
            onClick={() => setActiveButton("replies")}
          >
            Replies
          </button>
          <button
            className={`switch-button ${
              activeButton === "likes"
                ? "bg-cyan-500 text-white"
                : "bg-gray-300 text-gray-700"
            } hover:bg-cyan-600 transition duration-300 px-4 py-2 rounded`}
            onClick={() => setActiveButton("likes")}
          >
            Likes
          </button>
        </div>
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
    </>
  );
};

export default UserProfile;
