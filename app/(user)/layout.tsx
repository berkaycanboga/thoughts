import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-gray-100">{children}</div>
    </div>
  );
};

export default UserLayout;
