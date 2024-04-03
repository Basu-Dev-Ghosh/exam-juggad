"use client";
import React, { useEffect } from "react";
import PapersContainer from "./PapersContainer";
import { useHomeStore } from "@/app/_store/HomeStore";
import { useSession } from "next-auth/react";
import Suggestion from "./Suggestion";

const Suggestions = () => {
  const [getSuggestions, suggestions] = useHomeStore((state) => [
    state.getSuggestions,
    state.suggestions,
  ]);
  const { data: session } = useSession();
  useEffect(() => {
    getSuggestions(session?.user?.email);
  }, []);

  return (
    <PapersContainer>
      <div className="h-[99%]">
        <p className="text-white pb-3 text-2xl text-center capitalize border-b border-dashed">
          Your saved suggestions
        </p>
        <div className="flex flex-col w-full mt-6">
          {!suggestions ||
            (suggestions.length === 0 && (
              <p className="text-center text-lg text-white">
                No suggestions here
              </p>
            ))}
          {suggestions &&
            suggestions.map((suggestion: any) => (
              <Suggestion key={suggestion.id} suggestion={suggestion} />
            ))}
        </div>
      </div>
    </PapersContainer>
  );
};

export default Suggestions;
