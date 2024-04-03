"use client";
import React, { useEffect } from "react";
import PapersContainer from "./PapersContainer";
import Paper from "./Paper";
import { useHomeStore } from "@/app/_store/HomeStore";

const Papers = () => {
  const [getPapers, papers] = useHomeStore((state) => [
    state.getPapers,
    state.papers,
  ]);
  useEffect(() => {
    getPapers();
  }, []);

  return (
    <PapersContainer>
      <div className="h-[99%]">
        <p className="text-white pb-3 text-2xl text-center capitalize border-b border-dashed">
          Your saved question papers
        </p>
        <div className="flex flex-col w-full mt-6">
          {!papers ||
            (papers.length === 0 && (
              <p className="text-center text-lg text-white">No papers here</p>
            ))}
          {papers &&
            papers.map((paper: any) => <Paper key={paper.id} paper={paper} />)}
        </div>
      </div>
    </PapersContainer>
  );
};

export default Papers;
