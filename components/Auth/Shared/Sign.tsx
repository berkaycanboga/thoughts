import Image from "next/image";
import React from "react";

interface SignProps {
  title: string;
  formComponent: React.ReactNode;
  linkText: string;
  linkUrl: string;
  conditionalText?: string;
}

const Sign = ({
  title,
  formComponent,
  linkText,
  linkUrl,
  conditionalText,
}: SignProps) => {
  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white text-gray-800 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-cyan-600">
        {title}{" "}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={60}
          priority={true}
          className="inline-block ml-2"
        />
      </h2>
      {formComponent}
      <div className="mt-4 text-center text-gray-600">
        {conditionalText && <p>{conditionalText}</p>}
        <a href={linkUrl} className="text-cyan-600 hover:underline">
          {linkText}
        </a>
      </div>
    </div>
  );
};

export default Sign;
