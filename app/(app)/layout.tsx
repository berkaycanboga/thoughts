import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
