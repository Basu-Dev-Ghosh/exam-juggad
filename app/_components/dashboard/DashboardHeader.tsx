import React from "react";
import Logo from "../ui/Logo";
import Profile from "../ui/Profile";
import DashboardMobileNavbar from "./DashboardMobileNavbar";

const DashboardHeader = () => {
  return (
    <div className="w-full  flex justify-center md:justify-between px-4 py-10 md:px-10 md:py-1 flex-wrap">
      <Logo />
      <DashboardMobileNavbar />
      <Profile />
    </div>
  );
};

export default DashboardHeader;
