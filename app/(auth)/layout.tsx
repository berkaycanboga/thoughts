import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-start p-8">
      <div className="mb-8">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={50}
          priority={true}
        />
      </div>
      <div className="w-full md:w-96 mx-auto my-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
