import React from "react";

import { PostValidation } from "../../utils/validation/postValidation";
import FormTextarea from "../Shared/FormTextarea";

interface CommentFormTextareaProps {
  initialValues: PostValidation;
  onSubmit: (values: PostValidation) => void;
  isLoading: boolean;
  disabled: boolean;
}

const CommentFormTextarea = ({
  initialValues,
  onSubmit,
  isLoading,
  disabled,
}: CommentFormTextareaProps) => {
  return (
    <FormTextarea
      initialValues={initialValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
      buttonText="Comment"
      disabled={disabled}
    />
  );
};

export default CommentFormTextarea;
