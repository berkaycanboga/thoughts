"use client";

// Sidebar.tsx
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  BsHouse,
  BsHouseFill,
  BsSearch,
  BsPencil,
  BsPencilFill,
  BsPerson,
  BsPersonFill,
} from "react-icons/bs";

import Search from "../Search/Search";

interface RenderLinkProps {
  path: string;
  icon: React.ComponentType<{ className: string }>;
  label: string;
}

const Sidebar = () => {
  const pathname = usePathname();
  const currentPath = pathname;

  const isIconFilled = (path: string) => currentPath.startsWith(path);

  const [windowWidth, setWindowWidth] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const renderLink = ({ path, icon, label }: RenderLinkProps) => (
    <Link
      href={path}
      className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
    >
      {isIconFilled(path)
        ? React.createElement(icon, {
            className: `icon ${!showIconsOnly && "mr-3"} text-cyan-500 text-2xl`,
          })
        : React.createElement(icon, {
            className: `icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`,
          })}
      {!showIconsOnly && (
        <span
          className={`hidden sm:inline-block text-lg ${
            isIconFilled(path) ? "font-bold" : ""
          }`}
        >
          {label}
        </span>
      )}
    </Link>
  );

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="flex relative">
      <div
        className={`fixed left-0 top-0 border-r border-gray-300 h-full flex flex-col bg-gray-100 shadow-md p-4 ${showIconsOnly ? "" : "min-w-80"}`}
      >
        <ul className="space-y-4 w-full">
          <div className="mb-4 p-3">
            <Image
              src={showIconsOnly ? "/favicon.ico" : "/logo.svg"}
              alt="Logo"
              width={showIconsOnly ? 24 : 120}
              height={showIconsOnly ? 24 : 120}
              priority={true}
            />
          </div>
          <li>
            {renderLink({
              path: "/dashboard",
              icon: isIconFilled("/dashboard") ? BsHouseFill : BsHouse,
              label: "Home",
            })}
          </li>
          <li>
            <button
              className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
              onClick={toggleSearch}
            >
              {React.createElement(BsSearch, {
                className: `icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`,
              })}
              {!showIconsOnly && (
                <span className={`hidden sm:inline-block text-lg`}>Search</span>
              )}
            </button>
          </li>
          <li>
            {renderLink({
              path: "/create",
              icon: isIconFilled("/create") ? BsPencilFill : BsPencil,
              label: "Create",
            })}
          </li>
          <li>
            {renderLink({
              path: "/profile",
              icon: isIconFilled("/profile") ? BsPersonFill : BsPerson,
              label: "Profile",
            })}
          </li>
        </ul>
      </div>
      {isSearchOpen && (
        <div className="fixed top-0 border-r border-gray-300 h-full flex flex-col bg-gray-100 shadow-md p-4 min-w-80">
          <Search onClose={toggleSearch} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
