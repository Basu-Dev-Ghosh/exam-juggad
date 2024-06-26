"use client";
import React, { useEffect } from "react";
import PapersContainer from "./PapersContainer";
import Paper from "./Paper";
import { useHomeStore } from "@/app/_store/HomeStore";
import { useSession } from "next-auth/react";

const Papers = () => {
  const [getPapers, papers] = useHomeStore((state) => [
    state.getPapers,
    state.papers,
  ]);
  const { data: session } = useSession();
  useEffect(() => {
    getPapers(session?.user?.email);
  }, []);

  return (
    <PapersContainer>
      <div className="h-[99%] overflow-y-hidden">
        <p className="text-white pb-3 text-2xl text-center capitalize border-b border-dashed">
          Your saved question papers
        </p>
        <div className="flex flex-col w-full my-6 scroll-div max-h-[80%] overflow-y-auto">
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
