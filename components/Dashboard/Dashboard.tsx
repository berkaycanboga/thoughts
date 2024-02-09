"use client";

import React, { useState, useEffect } from "react";

import { Post } from "../../models/Post";
import { processNewPosts } from "../../utils/api/mainFeed";
import PostContainer from "../Common/PostContainer";
import CreatePostForm from "../Post/CreatePostForm";
import LoadingPlaceholder from "../Post/PlaceholderPost";
import PostItem from "../Post/PostItem";

interface DashboardProps {
  userId: number;
  username: string;
  fullName: string;
  posts: Post[];
}

const Dashboard = ({ userId, posts: initialPosts }: DashboardProps) => {
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [showNewPosts, setShowNewPosts] = useState(false);
  const [mainFeed, setMainFeed] = useState<Post[]>(initialPosts);
  const [isManualPostCreationInProgress, setManualPostCreationInProgress] =
    useState(false);
  const [showPlaceholderPost, setShowPlaceholderPost] = useState(false);

  const handleCreatePost = async (createdPost: Post) => {
    setShowPlaceholderPost(true);
    setManualPostCreationInProgress(true);

    if (createdPost.author?.id === userId) {
      setMainFeed((prevMainFeed) => [createdPost, ...prevMainFeed]);
    } else {
      setNewPosts((prevPosts) => [createdPost, ...prevPosts]);
      if (newPosts.length === 0) {
        setShowNewPosts(true);
      }
    }

    setTimeout(async () => {
      setManualPostCreationInProgress(false);

      await processNewPosts(
        userId,
        () => mainFeed,
        setNewPosts,
        setShowNewPosts,
        setMainFeed,
      );
      setShowPlaceholderPost(false);
    }, 1500);
  };

  const handleUpdatePost = async (postId: number, editedContent: string) => {
    setMainFeed((prevMainFeed) =>
      prevMainFeed.map((post) =>
        post.id === postId ? { ...post, content: editedContent } : post,
      ),
    );
  };

  const handleDeletePost = async (postId: number) => {
    setMainFeed((prevMainFeed) =>
      prevMainFeed.filter((post) => post.id !== postId),
    );
  };

  const handleShowNewPosts = () => {
    setMainFeed((prevMainFeed) => [...newPosts, ...prevMainFeed]);
    setShowNewPosts(true);
    setNewPosts([]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isManualPostCreationInProgress) {
        processNewPosts(
          userId,
          () => mainFeed,
          setNewPosts,
          setShowNewPosts,
          setMainFeed,
        );
      }
    }, 15000);

    return () => clearInterval(intervalId);
  }, [mainFeed, userId, isManualPostCreationInProgress]);

  const sortedMainFeed = mainFeed.slice().sort((a, b) => {
    const dateA = new Date(a.createdAt as Date);
    const dateB = new Date(b.createdAt as Date);
    return dateB.getTime() - dateA.getTime();
  });

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

      {showPlaceholderPost && (
        <div className="mb-4 p-3 bg-white rounded-md shadow-md h-auto min-h-40">
          <LoadingPlaceholder />
        </div>
      )}
      {[...sortedMainFeed].map((post) => (
        <React.Fragment key={post.id}>
          <PostItem
            userId={post.author?.id as number}
            postId={post.id as number}
            content={post.content}
            username={post.author?.username as string}
            fullName={post.author?.fullName as string}
            createdAt={post.createdAt as Date}
            updatedAt={post.updatedAt as Date}
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

export default Dashboard;
