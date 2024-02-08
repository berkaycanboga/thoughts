import React from "react";

interface CommentContainerProps {
  children: React.ReactNode;
}

const CommentContainer = ({ children }: CommentContainerProps) => {
  return (
    <div className="flex justify-center">
      <div className="border border-gray-200 rounded-md p-8 w-full max-w-xl">
        <div className="mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default CommentContainer;
