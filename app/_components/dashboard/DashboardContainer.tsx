"use client";
import React, { ReactNode } from "react";

const DashboardContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="dashboard-container min-w-[100%] md:min-w-[85%] max-w-8xl bg-[#D1D4E9] min-h-[90dvh] md:h-[80%] mt-0 md:mt-8  md:p-[20px] rounded-[20px]">
      {children}
    </div>
  );
};

export default DashboardContainer;
