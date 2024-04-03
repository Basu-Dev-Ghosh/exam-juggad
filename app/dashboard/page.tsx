import React from "react";

import DashboardBox from "../_components/dashboard/DashboardBox";
import DashboardSidebar from "../_components/dashboard/DashboardSidebar";
import Router from "../_components/Router";

const page = () => {
  return (
    <DashboardBox>
      <Router />
      <DashboardSidebar />
    </DashboardBox>
  );
};

export default page;
