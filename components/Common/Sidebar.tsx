"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
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

interface LinkProps {
  path: string;
  icon: React.ComponentType<{ className: string }>;
  label: string;
}

const useWindowWidth = (): number => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

const useIsIconFilled = (currentPath: string) => (path: string) =>
  currentPath.startsWith(path);

const Sidebar = () => {
  const pathname = usePathname();
  const windowWidth = useWindowWidth();
  const isIconFilled = useIsIconFilled(pathname);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const renderLink = ({ path, icon: Icon, label }: LinkProps): JSX.Element => (
    <Link
      href={path}
      className="flex items-center p-3 rounded-md hover:bg-gray-100 w-full"
    >
      <Icon
        className={`icon ${!showIconsOnly && "mr-3"} ${isIconFilled(path) ? "text-cyan-500" : "text-gray-500 hover:text-cyan-500"} text-2xl`}
      />
      {!showIconsOnly && (
        <span
          className={`hidden sm:inline-block text-lg ${isIconFilled(path) ? "font-bold" : ""}`}
        >
          {label}
        </span>
      )}
    </Link>
  );

  const showIconsOnly = windowWidth <= 1200;
  const showIconsAtBottom = windowWidth <= 800;

  return (
    <div className="flex relative flex-col">
      {!showIconsAtBottom && (
        <SidebarContent
          showIconsOnly={showIconsOnly}
          renderLink={renderLink}
          isIconFilled={isIconFilled}
          toggleSearch={toggleSearch}
        />
      )}

      {showIconsAtBottom && (
        <BottomIcons
          showIconsOnly={showIconsOnly}
          renderLink={renderLink}
          isIconFilled={isIconFilled}
          toggleSearch={toggleSearch}
        />
      )}

      {isSearchOpen && (
        <SearchBar
          showIconsOnly={showIconsOnly}
          showIconsAtBottom={showIconsAtBottom}
          toggleSearch={toggleSearch}
        />
      )}
    </div>
  );
};

const SidebarContent = ({
  showIconsOnly,
  renderLink,
  isIconFilled,
  toggleSearch,
}: {
  showIconsOnly: boolean;
  renderLink: (props: LinkProps) => JSX.Element;
  isIconFilled: (path: string) => boolean;
  toggleSearch: () => void;
}) => {
  const [profilePath, setProfilePath] = useState<string>("/profile");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        const userId = session.user.username;
        setProfilePath(`/${userId}`);
      }
    };

    fetchSession();
  }, []);

  return (
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
            <BsSearch
              className={`icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
            />
            {!showIconsOnly && (
              <span className="hidden sm:inline-block text-lg">Search</span>
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
            path: profilePath,
            icon: isIconFilled(profilePath) ? BsPersonFill : BsPerson,
            label: "Profile",
          })}
        </li>
      </ul>
    </div>
  );
};

const BottomIcons = ({
  showIconsOnly,
  renderLink,
  isIconFilled,
  toggleSearch,
}: {
  showIconsOnly: boolean;
  renderLink: (props: LinkProps) => JSX.Element;
  isIconFilled: (path: string) => boolean;
  toggleSearch: () => void;
}) => (
  <ul className="fixed bottom-0 bg-gray-100 w-full p-4 shadow-md flex justify-around">
    <li>
      {renderLink({
        path: "/dashboard",
        icon: isIconFilled("/dashboard") ? BsHouseFill : BsHouse,
        label: "Home",
      })}
    </li>
    <li>
      <button
        className="flex items-center p-3 rounded-md hover:bg-gray-100"
        onClick={toggleSearch}
      >
        <BsSearch
          className={`icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
        />
        {!showIconsOnly && (
          <span className="hidden sm:inline-block text-lg">Search</span>
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
);

const SearchBar = ({
  showIconsOnly,
  showIconsAtBottom,
  toggleSearch,
}: {
  showIconsOnly: boolean;
  showIconsAtBottom: boolean;
  toggleSearch: () => void;
}) => (
  <div
    className={`fixed ${showIconsAtBottom ? "bottom-0 left-0 right-0 h-full" : "top-0 h-full"} border-r border-gray-300 flex flex-col bg-gray-100 shadow-md p-4 ${showIconsOnly && !showIconsAtBottom ? "" : "min-w-80"}`}
  >
    <Search onClose={toggleSearch} />
  </div>
);

export default Sidebar;
