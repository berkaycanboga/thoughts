import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsSearch, BsArrowLeft } from "react-icons/bs";

import { User } from "../../models/User";
import { searchApiService } from "../../utils/api/search";

interface SearchProps {
  onClose: () => void;
}

const Search = ({ onClose }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        if (searchTerm.trim() !== "") {
          const response = (await searchApiService.getPost(
            searchTerm,
          )) as User[];
          const typedResponse = Object.values(response);
          setSearchResults(typedResponse);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div>
      <button
        onClick={onClose}
        className="flex items-center justify-center mb-5 hover:bg-gray-300 rounded-md transition duration-300 ease-in-out w-7 h-7 cursor-pointer"
      >
        <BsArrowLeft className="text-gray-500 text-3xl" />
      </button>
      <div
        className={`flex items-center border ${isInputFocused ? "border-cyan-300" : "border-gray-300"} rounded-md p-2 mb-4`}
      >
        <BsSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={`border-none bg-transparent ml-2 focus:outline-none flex-grow text-gray-800 placeholder-gray-500 px-4 py-2 rounded-md ${isInputFocused ? "focus:border-cyan-300" : ""}`}
        />
      </div>

      <div>
        {isLoading ? (
          <div className="text-gray-600 flex items-center">
            <span>Loading...</span>
            <div className="w-4 h-4 border-t-2 border-r-2 border-gray-800 rounded-full animate-spin ml-2"></div>
          </div>
        ) : searchResults.length > 0 ? (
          searchResults.map((result) => (
            <Link
              key={result.id}
              href={result.username}
              className="border-b block py-2 rounded-md pl-3 transition duration-300 ease-in-out hover:bg-gray-200"
            >
              <p className="text-gray-800 font-semibold">{result.username}</p>
              <p className="text-gray-600">{result.fullName}</p>
            </Link>
          ))
        ) : (
          searchTerm.trim() !== "" && (
            <p className="text-gray-600">No results found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
