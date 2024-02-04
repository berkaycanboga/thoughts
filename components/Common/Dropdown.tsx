import React, { useState, ReactNode, useEffect, useRef } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex w-full text-sm font-medium text-gray-700 transition-all duration-300 ease-in-out ${
            isDropdownOpen
              ? "bg-gray-200 rounded-md shadow-md"
              : "hover:bg-gray-100 hover:rounded-md hover:shadow-sm"
          }`}
          onClick={toggleDropdown}
        >
          {trigger}
        </button>
      </div>

      <div
        className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isDropdownOpen ? "max-h-40 ring-1 ring-gray-300" : "max-h-0 -mt-1"
        }`}
      >
        <div className="py-2">
          {React.Children.map(children, (child) => (
            <div className="block px-4 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
