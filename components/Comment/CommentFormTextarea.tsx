import React from "react";

import { PostValidation } from "../../utils/validation/postValidation";
import FormTextarea from "../Shared/FormTextarea";

interface CommentFormTextareaProps {
  initialValues: PostValidation;
  onSubmit: (values: PostValidation) => void;
  isLoading: boolean;
}

const CommentFormTextarea = ({
  initialValues,
  onSubmit,
  isLoading,
}: CommentFormTextareaProps) => {
  return (
    <FormTextarea
      initialValues={initialValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
      buttonText="Comment"
    />
  );
};

export default CommentFormTextarea;
