import Link from "next/link";
import React, { useState } from "react";

import Popup from "../Common/Popup";

interface ListPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  list: { username: string; fullName: string }[];
}

const ListPopup = ({ isOpen, onClose, title, list }: ListPopupProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = list.filter(
    (item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const maxVisibleItems = 5;
  const remainingItems = filteredList.slice(maxVisibleItems);
  const hasScroll = remainingItems.length > 0;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      content={
        <>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md"
          />

          <ul
            className={`divide-y divide-gray-300 overflow-y-auto max-h-72 h-72`}
          >
            {filteredList.slice(0, maxVisibleItems).map((item, index) => (
              <li key={index} className="py-2 px-4">
                <Link
                  href={`/${item.username}`}
                  className="rounded-md hover:bg-gray-100 transition duration-300 block p-2"
                >
                  <p className="font-semibold">{item.fullName}</p>
                  <p className="text-gray-500">@{item.username}</p>
                </Link>
              </li>
            ))}
            {hasScroll && (
              <div className="overflow-y-auto">
                {remainingItems.map((item, index) => (
                  <li key={index} className="py-2 px-4">
                    <Link
                      href={`/${item.username}`}
                      className="rounded-md hover:bg-gray-100 transition duration-300 block p-2"
                    >
                      <p className="font-semibold">{item.fullName}</p>
                      <p className="text-gray-500">@{item.username}</p>
                    </Link>
                  </li>
                ))}
              </div>
            )}
          </ul>
        </>
      }
      width="w-full max-w-md"
      height="h-auto"
    />
  );
};

export default ListPopup;
