import React, { useState } from "react";

import { Post } from "../../models/Post";
import { postsApiService } from "../../utils/api/post";
import { PostValidation } from "../../utils/validation/postValidation";
import useErrorHandling from "../Common/ErrorDisplay";

import PostFormTextarea from "./PostFormTextarea";

interface CreatePostFormProps {
  userId: number;
  onSuccess: (createdPost: Post) => void;
}

const CreatePostForm = ({ userId, onSuccess }: CreatePostFormProps) => {
  const { error, handleError, resetError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (createdPost: Post) => {
    setIsLoading(false);
    if (onSuccess) {
      onSuccess(createdPost);
    }
  };

  const handleSubmit = async (values: PostValidation) => {
    try {
      setIsLoading(true);
      resetError();

      const createdPost = await postsApiService.createPost(
        userId,
        values.postContent,
      );

      handleSuccess(createdPost);
    } catch (err) {
      handleError(err, "Error creating post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}
      <PostFormTextarea
        isUpdatePost={false}
        initialValues={{ postContent: "" }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreatePostForm;
