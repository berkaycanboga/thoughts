"use client";

import React, { useState, useEffect } from "react";

import { PostProps } from "../../models/Post";
import { processNewPosts } from "../../utils/api/mainFeed";
import { handleDeletePostFeed, handleUpdatePostFeed } from "../../utils/post";
import PostContainer from "../Common/PostContainer";
import CreatePostForm from "../Post/CreatePostForm";
import PostItem from "../Post/PostItem";

interface DashboardProps {
  userId: number;
  username: string;
  fullName: string;
  posts?: PostProps[] | null;
}

const Dashboard = ({ userId, posts: initialPosts = [] }: DashboardProps) => {
  const [newPosts, setNewPosts] = useState<PostProps[]>([]);
  const [feed, setFeed] = useState<PostProps[]>(() => initialPosts || []);
  const [showNewPosts, setShowNewPosts] = useState(false);

  const handleCreatePost = (newPost: PostProps) => {
    setFeed((prevFeed) => [newPost, ...prevFeed]);
  };

  const handleUpdatePost = async (postId: number, editedContent: string) => {
    handleUpdatePostFeed(postId, editedContent, feed, setFeed);
  };

  const handleDeletePost = async (postId: number) => {
    handleDeletePostFeed(postId, feed, setFeed);
  };

  const handleShowNewPosts = () => {
    setFeed((prevFeed) => [
      ...newPosts.filter(
        (post) => !prevFeed.some((prevPost) => post.id === prevPost.id),
      ),
      ...prevFeed,
    ]);
    setNewPosts([]);
    setShowNewPosts(false);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const { newPosts } = await processNewPosts(userId);

        if (newPosts && newPosts.length > 0) {
          const filteredNewPosts = newPosts.filter(
            (post) =>
              post.author.id !== userId &&
              !feed.some((prevPost) => post.id === prevPost.id),
          );

          setNewPosts(filteredNewPosts);
        }
      } catch (e) {
        console.error(e);
      }
    }, 15_000);

    return () => clearInterval(intervalId);
  }, [feed, userId]);

  return (
    <PostContainer>
      <div className="pb-4 border-b border-gray-200 mb-4">
        <CreatePostForm userId={userId} onSuccess={handleCreatePost} />
      </div>

      {newPosts.length > 0 && !showNewPosts && (
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleShowNewPosts}
          >
            Show {newPosts.length} new post(s)
          </button>
        </div>
      )}

      {feed.map((post) => (
        <PostItem
          {...post}
          key={post.id}
          userId={userId}
          onPostUpdate={(updatedContent) =>
            handleUpdatePost(post.id as number, updatedContent)
          }
          onPostDelete={() => handleDeletePost(post.id as number)}
        />
      ))}
    </PostContainer>
  );
};

export default Dashboard;
