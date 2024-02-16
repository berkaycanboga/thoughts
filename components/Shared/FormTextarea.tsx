import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";

import { calculatePostDetails } from "../../utils/postFormUtils";
import {
  PostValidation,
  PostSchema,
} from "../../utils/validation/postValidation";

interface FormTextareaProps {
  initialValues: PostValidation;
  onSubmit: (values: PostValidation) => void;
  isLoading: boolean;
  buttonText: string;
  disabled?: boolean;
}

const FormTextarea = ({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
  disabled,
}: FormTextareaProps) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values: PostValidation) => {
      onSubmit(values);
      formik.resetForm();
    },
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

  const textareaRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      formik.setErrors({});
    }, 5000);

    return () => clearTimeout(timer);
  }, [formik, formik.errors]);

  return (
    <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4 relative">
      <div className="relative">
        <textarea
          ref={textareaRef}
          maxLength={379}
          value={formik.values.postContent}
          onChange={(e) => {
            const newContent = e.target.value;
            formik.handleChange(e);
            if (newContent.length <= 379) {
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + 2 + "px";
            }
          }}
          onBlur={formik.handleBlur}
          className={`w-full min-h-[4rem] h-auto px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-cyan-300 text-gray-800 resize-none relative`}
          name="postContent"
          disabled={disabled}
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
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
            <span>{"Creating..."}</span>
          </div>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
};

export default FormTextarea;
