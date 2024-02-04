import React, { useEffect } from "react";
import { useFormik } from "formik";
import { calculatePostDetails } from "../../utils/postFormUtils";
import {
  PostValidation,
  PostSchema,
} from "../../utils/validation/postValidation";

interface PostFormTextareaProps {
  isUpdatePost?: boolean;
  initialValues: PostValidation;
  onSubmit: (values: PostValidation) => void;
  isLoading: boolean;
  onContentChange?: (content: string) => void;
}

const PostFormTextarea = ({
  isUpdatePost = false,
  initialValues,
  onSubmit,
  isLoading,
  onContentChange,
}: PostFormTextareaProps) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values: PostValidation) => {
      try {
        PostSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage =
            (error as { errors?: Array<{ message: string }> })?.errors?.[0]
              ?.message ||
            error.message ||
            "Validation error";
          return { postContent: errorMessage };
        }
        return {};
      }
    },
  });

  const {
    remainingSpace,
    counterClasses,
    showNumber,
    isButtonDisabled,
    postStyle,
  } = calculatePostDetails(formik.values, isLoading);

  const notifyContentChange = (newContent: string) => {
    if (onContentChange) {
      onContentChange(newContent);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      formik.setErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }, [formik.errors]);

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4 relative">
      <div className="relative">
        <textarea
          maxLength={379}
          value={formik.values.postContent}
          onChange={(e) => {
            const newContent = e.target.value;
            formik.handleChange(e);
            notifyContentChange(newContent);
            if (newContent.length <= 379) {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + 2 + "px";
            }
          }}
          onBlur={formik.handleBlur}
          className={`w-full min-h-[4rem] h-auto px-4 py-2 border rounded-md bg-gray-100 focus:outline-none ${
            isUpdatePost ? "focus:border-cyan-300" : "focus:border-cyan-300"
          } text-gray-800 resize-none relative`}
          name="postContent"
        />
        <div
          className={`absolute bottom-2 right-2 flex items-center justify-center ${counterClasses}`}
          style={postStyle}
        >
          {showNumber && <span className="text-sm">{remainingSpace}</span>}
        </div>
      </div>

      {formik.errors.postContent && (
        <p className="text-red-500 text-sm mb-4">{formik.errors.postContent}</p>
      )}

      <button
        type="submit"
        className={`w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300 focus:outline-none focus:shadow-outline ${
          isButtonDisabled
            ? "opacity-50 pointer-events-none"
            : "hover:from-cyan-600 hover:to-cyan-700 active:from-cyan-700 active:to-cyan-800"
        }`}
        disabled={isButtonDisabled}
      >
        {isLoading ? "Saving..." : isUpdatePost ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostFormTextarea;