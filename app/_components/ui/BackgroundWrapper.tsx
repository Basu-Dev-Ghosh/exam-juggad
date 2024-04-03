"use client";
import { useHomeStore } from "@/app/_store/HomeStore";
import React from "react";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  let background = useHomeStore((state) => state.background);

  return (
    <div
      style={{
        background: `url(${background || "bg/bg1.jpg"})`,
      }}
      className={
        "background-wrapper  flex justify-center w-full min-h-[100dvh] md:h-[100dvh] overflow-hidden"
      }
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
