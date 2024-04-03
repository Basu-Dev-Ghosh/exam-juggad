"use client";
import React from "react";

const DashboardBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[95%] dashboard-box rounded-[20px]  md:flex md:justify-end">
      {children}
    </div>
  );
};

export default DashboardBox;
