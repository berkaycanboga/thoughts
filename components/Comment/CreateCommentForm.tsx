import React, { useState } from "react";

import { Comment } from "../../models/Comment";
import { commentsApiService } from "../../utils/api/comment";
import { PostValidation } from "../../utils/validation/postValidation";
import useErrorHandling from "../Common/ErrorDisplay";

import CommentFormTextarea from "./CommentFormTextarea";

interface CreateCommentFormProps {
  userId: number;
  postId: number;
  onSuccess: (createdComment: Comment) => void;
}

const CreateCommentForm = ({
  userId,
  postId,
  onSuccess,
}: CreateCommentFormProps) => {
  const { error, handleError, resetError } = useErrorHandling();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (createdComment: Comment) => {
    setIsLoading(false);
    if (onSuccess) {
      onSuccess(createdComment);
    }
  };

  const handleSubmit = async (values: PostValidation) => {
    try {
      setIsLoading(true);
      resetError();

      const createdComment = await commentsApiService.createComment(
        userId,
        postId,
        values.postContent,
      );

      handleSuccess(createdComment);
    } catch (err) {
      handleError(err, "Error creating comment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}
      <CommentFormTextarea
        initialValues={{ postContent: "" }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CreateCommentForm;
