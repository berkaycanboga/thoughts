// Common/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-4">
      <div className="container mx-auto text-center text-gray-600">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Some Brand. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
