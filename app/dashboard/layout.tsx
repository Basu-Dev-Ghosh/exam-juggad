"use client";

import DashboardContainer from "../_components/dashboard/DashboardContainer";
import BackgroundWrapper from "../_components/ui/BackgroundWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BackgroundWrapper>
      <DashboardContainer>{children}</DashboardContainer>
    </BackgroundWrapper>
  );
}
