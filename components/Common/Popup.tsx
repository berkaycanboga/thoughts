import React, { useEffect, useRef } from "react";
import { BsX } from "react-icons/bs";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  actions?: React.ReactNode;
  width?: string;
  height?: string;
}

const Popup = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
  width = "max-w-xl",
  height = "h-auto",
}: PopupProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 z-50 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity`}
      onClick={handleOverlayClick}
      ref={overlayRef}
    >
      <div
        className={`bg-white p-10 ${width} ${height} rounded-md transform transition-transform duration-300`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <BsX className="text-2xl hover:bg-gray-100 rounded-full transition-all duration-300" />
        </button>
        <p className="text-2xl font-semibold mb-4">{title}</p>
        <div className="mb-8">{content}</div>
        <div className="flex items-center">{actions}</div>
      </div>
    </div>
  );
};

export default Popup;
