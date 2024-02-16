import React, { ReactNode } from "react";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default UserLayout;
