import React from "react";

interface PostContainerProps {
  children: React.ReactNode;
}

const PostContainer = ({ children }: PostContainerProps) => {
  return (
    <div className="flex justify-center">
      <div className="border border-gray-200 rounded-md p-4 w-full max-w-xl">
        <div className="mx-auto mt-8">{children}</div>
      </div>
    </div>
  );
};

export default PostContainer;
