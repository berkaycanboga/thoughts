"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSession } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import {
  BsHouse,
  BsHouseFill,
  BsSearch,
  BsPerson,
  BsPersonFill,
  BsBoxArrowRight,
} from "react-icons/bs";

import { signOutApi } from "../../utils/api/signOut";
import Search from "../Search/Search";

interface LinkProps {
  path: string;
  icon: React.ComponentType<{ className: string }>;
  label: string;
}

const handleSignOut = async () => {
  const result = await signOutApi();
  if (!result.success) {
    console.error("Error during sign-out:", result.error);
  }
};

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
      className="flex items-center p-3 hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out w-full"
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
    <div className="flex relative flex-col z-50">
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
            className="flex items-center p-3 hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out w-full"
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
            path: profilePath,
            icon: isIconFilled(profilePath) ? BsPersonFill : BsPerson,
            label: "Profile",
          })}
        </li>
        <li>
          <button
            className="flex items-center hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out p-3 w-full"
            onClick={handleSignOut}
          >
            <BsBoxArrowRight
              className={`icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
            />
            {!showIconsOnly && (
              <span className="hidden sm:inline-block text-lg">Sign Out</span>
            )}
          </button>
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
          className="flex items-center p-3 hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out"
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
          path: profilePath,
          icon: isIconFilled("/profile") ? BsPersonFill : BsPerson,
          label: "Profile",
        })}
      </li>
      <li>
        <button
          className="flex items-center p-3 hover:bg-cyan-100 rounded-md transition duration-300 ease-in-out"
          onClick={handleSignOut}
        >
          <BsBoxArrowRight
            className={`icon ${!showIconsOnly && "mr-3"} text-gray-500 hover:text-cyan-500 text-2xl`}
          />
          {!showIconsOnly && (
            <span className="hidden sm:inline-block text-lg">Sign Out</span>
          )}
        </button>
      </li>
    </ul>
  );
};

const SearchBar = ({
  showIconsOnly,
  showIconsAtBottom,
  toggleSearch,
}: {
  showIconsOnly: boolean;
  showIconsAtBottom: boolean;
  toggleSearch: () => void;
}) => {
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        toggleSearch();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSearch]);

  return (
    <div
      ref={searchBarRef}
      className={`fixed ${
        showIconsAtBottom ? "bottom-0 left-0 right-0 h-full" : "top-0 h-full"
      } border-r border-gray-300 flex flex-col bg-gray-100 shadow-md p-4 ${
        showIconsOnly && !showIconsAtBottom ? "" : "min-w-80"
      }`}
    >
      <Search onClose={toggleSearch} onResultClick={toggleSearch} />
    </div>
  );
};

export default Sidebar;
