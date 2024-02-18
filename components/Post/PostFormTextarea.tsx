import React from "react";

import { PostValidation } from "../../utils/validation/postValidation";
import FormTextarea from "../Shared/FormTextarea";

interface PostFormTextareaProps {
  isUpdatePost?: boolean;
  initialValues: PostValidation;
  onSubmit: (values: PostValidation) => void;
  isLoading: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PostFormTextarea = ({
  isUpdatePost = false,
  initialValues,
  onSubmit,
  isLoading,
  disabled,
  onChange,
}: PostFormTextareaProps) => {
  return (
    <FormTextarea
      initialValues={initialValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
      buttonText={isUpdatePost ? "Update Post" : "Create Post"}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

export default PostFormTextarea;
