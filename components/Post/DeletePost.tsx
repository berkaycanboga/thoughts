import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { postsApiService } from "../../utils/api/postApi";
import Popup from "../Common/Popup";
import useErrorHandling from "../Common/ErrorDisplay";

interface DeletePostProps {
  userId: number;
  postId: number;
  onPostDelete: () => void;
}

const DeletePost = ({ userId, postId, onPostDelete }: DeletePostProps) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { error, handleError, resetError } = useErrorHandling();

  const confirmDelete = async () => {
    try {
      setIsDeleteLoading(true);

      await postsApiService.deletePost(userId, postId);

      setIsDeleteConfirmOpen(false);
      setIsDeleteLoading(false);

      if (onPostDelete) {
        onPostDelete();
      }
    } catch (err) {
      handleError(err, "Error deleting post");
      setIsDeleteLoading(false);
    }
  };

  const handlePopupClose = () => {
    setIsDeleteConfirmOpen(false);
    resetError();
  };

  return (
    <>
      <div
        onClick={() => setIsDeleteConfirmOpen(true)}
        className="cursor-pointer text-red-500 hover:text-red-700 flex items-center space-x-2"
      >
        <BsTrash className="text-xl" />
        <span className="text-sm">Delete Post</span>
      </div>

      <Popup
        isOpen={isDeleteConfirmOpen}
        onClose={handlePopupClose}
        title="Confirm Deletion"
        content={
          <p className="text-sm mb-8">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        }
        actions={
          <>
            {error && (
              <p className="py-2 text-red-500 text-sm">{error.message}</p>
            )}

            <div className="flex-grow"></div>

            <button
              onClick={handlePopupClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-300 text-sm hover:shadow-md"
            >
              Cancel
            </button>

            <button
              onClick={confirmDelete}
              className={`px-4 py-2 rounded-md text-sm ${
                isDeleteLoading
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-700"
              } transition-all duration-300 ml-2 hover:shadow-md`}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </>
        }
        width="w-full max-w-xl"
        height="h-auto"
      />
    </>
  );
};

export default DeletePost;
