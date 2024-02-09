import React, { useState } from "react";
import { BsChatSquare } from "react-icons/bs";

import Popup from "../Common/Popup";

import CreateCommentForm from "./CreateCommentForm";

interface CreateCommentFormPopupProps {
  userId: number;
  postId: number;
}

const CreateCommentFormPopup = ({
  userId,
  postId,
}: CreateCommentFormPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out w-7 h-7 cursor-pointer">
          <BsChatSquare
            className={`text-gray-500 hover:text-cyan-500 transition duration-300 ease-in-out`}
            onClick={openPopup}
          />
        </div>
        <Popup
          isOpen={isOpen}
          onClose={closePopup}
          title="Add Comment"
          content={
            <CreateCommentForm
              userId={userId}
              postId={postId}
              onSuccess={closePopup}
            />
          }
          width="w-full max-w-xl"
          height="auto"
        />
      </div>
    </>
  );
};

export default CreateCommentFormPopup;
