"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BsHouse,
  BsHouseFill,
  BsSearch,
  BsPencil,
  BsPencilFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  const isIconFilled = (path: string) => currentPath.startsWith(path);

  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showIconsOnly = windowWidth <= 1000;

  return (
    <div
      className={`fixed left-0 top-0 border-r border-gray-300 h-full flex flex-col items-center justify-start bg-gray-100 shadow-md p-4 ${showIconsOnly ? "" : "sm:pr-36"}`}
    >
      <div className="mb-4 flex items-center">
        <Image
          src={showIconsOnly ? "/favicon.ico" : "/logo.svg"}
          alt="Logo"
          width={showIconsOnly ? 24 : 120}
          height={showIconsOnly ? 24 : 120}
          priority={true}
        />
      </div>
      <ul className="space-y-4 w-full">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
          >
            {isIconFilled("/dashboard") ? (
              <BsHouseFill
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-cyan-500 text-2xl`}
              />
            ) : (
              <BsHouse
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
              />
            )}
            {!showIconsOnly && (
              <span
                className={`hidden sm:inline-block text-lg ${
                  isIconFilled("/") ? "font-bold" : ""
                }`}
              >
                Home
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
          >
            <BsSearch
              className={`icon ${showIconsOnly ? "" : "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
            />
            {!showIconsOnly && (
              <span
                className={`hidden sm:inline-block text-lg ${
                  isIconFilled("/search") ? "font-bold" : ""
                }`}
              >
                Search
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/create"
            className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
          >
            {isIconFilled("/create") ? (
              <BsPencilFill
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-cyan-500 text-2xl`}
              />
            ) : (
              <BsPencil
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
              />
            )}
            {!showIconsOnly && (
              <span
                className={`hidden sm:inline-block text-lg ${
                  isIconFilled("/create") ? "font-bold" : ""
                }`}
              >
                Create
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
          >
            {isIconFilled("/profile") ? (
              <BsPersonFill
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-cyan-500 text-2xl`}
              />
            ) : (
              <BsPerson
                className={`icon ${showIconsOnly ? "" : "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
              />
            )}
            {!showIconsOnly && (
              <span
                className={`hidden sm:inline-block text-lg ${
                  isIconFilled("/profile") ? "font-bold" : ""
                }`}
              >
                Profile
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
