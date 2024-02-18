import React, { useState } from "react";

import { PostProps } from "../../models/Post";
import { postsApiService } from "../../utils/api/post";
import { PostValidation } from "../../utils/validation/postValidation";
import useErrorHandling from "../Common/ErrorDisplay";

import PostFormTextarea from "./PostFormTextarea";

interface CreatePostFormProps {
  userId: number;
  onSuccess?: (createdPost: PostProps) => void;
  disabled?: boolean;
}

const CreatePostForm = ({
  userId,
  onSuccess,
  disabled,
}: CreatePostFormProps) => {
  const { error, handleError, resetError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (createdPost: PostProps) => {
    setIsLoading(false);
    if (onSuccess) {
      onSuccess(createdPost);
    }
  };

  const handleSubmit = async (values: PostValidation) => {
    try {
      if (disabled) {
        return;
      }

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
        disabled={disabled}
      />
    </div>
  );
};

export default CreatePostForm;
