import React, { useEffect, useState } from "react";
import { BsInfoCircle, BsPencil } from "react-icons/bs";
import { postsApiService } from "../../utils/api/post";
import PreviewPost from "./PreviewPost";
import Popup from "../Common/Popup";
import PostFormTextarea from "./PostFormTextarea";
import { PostValidation } from "../../utils/validation/postValidation";
import useErrorHandling from "../Common/ErrorDisplay";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface UpdatePostProps {
  userId: number;
  postId: number;
  content: string;
  onPostUpdate: (editedContent: string) => void;
}

const UpdatePost = ({
  userId,
  postId,
  content,
  onPostUpdate,
}: UpdatePostProps) => {
  const { error, handleError, resetError } = useErrorHandling();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [draftContent, setDraftContent] = useState(content);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const handlePostUpdate = async (values: PostValidation) => {
    try {
      setIsUpdateLoading(true);
      resetError();

      const updatedContent = values.postContent;
      await postsApiService.updatePost(userId, postId, updatedContent);

      setIsEditing(false);
      setIsUpdateLoading(false);

      if (onPostUpdate) {
        onPostUpdate(updatedContent);
      }
    } catch (err) {
      handleError(err, "Error updating the post");
      setIsUpdateLoading(false);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setDraftContent(newContent);
  };

  const handlePopupClose = () => {
    setIsEditing(false);
    resetError();
  };

  return (
    <div className="relative">
      <div
        onClick={() => setIsEditing(true)}
        className="cursor-pointer text-gray-500 hover:text-gray-700 flex items-center space-x-2 mb-2"
      >
        <BsPencil className="text-xl" />
        <span className="text-sm">Edit Post</span>
      </div>

      <Popup
        isOpen={isEditing}
        onClose={handlePopupClose}
        title="Edit Your Post"
        content={
          <>
            <div className="relative">
              {error && <p className="text-red-500 text-sm">{error.message}</p>}
              <PostFormTextarea
                isUpdatePost
                initialValues={{ postContent: content }}
                onSubmit={handlePostUpdate}
                isLoading={isUpdateLoading}
                onContentChange={handleContentChange}
              />
            </div>
            <div className="text-sm text-gray-500 flex my-2 items-center">
              <BsInfoCircle className=" text-sm mr-1" />
              If you make changes, your post will be marked as updated.
            </div>
            <div className="mt-2 border-t border-gray-300"></div>
            <div className="text-sm text-gray-500">Preview:</div>

            <PreviewPost
              content={draftContent}
              fullName={session?.user.fullName as string}
              username={session?.user.username as string}
              createdAt={new Date()}
              updatedAt={new Date()}
            />
          </>
        }
        width="w-full max-w-xl"
        height="h-auto"
      />
    </div>
  );
};

export default UpdatePost;
