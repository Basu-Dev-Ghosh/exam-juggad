"use client";
import React, { useEffect } from "react";

import { useHomeStore } from "@/app/_store/HomeStore";
import PapersContainer from "../papers/PapersContainer";
import Paper from "../papers/Paper";
import Question from "./Question";
import { useSession } from "next-auth/react";

const QuestionsScreen = () => {
  const [getQuestions, questions] = useHomeStore((state) => [
    state.getQuestions,
    state.questions,
  ]);
  const { data: session } = useSession();
  useEffect(() => {
    getQuestions(session?.user?.email);
  }, []);

  return (
    <PapersContainer>
      <div className="h-[99%] overflow-y-hidden">
        <p className="text-white pb-3 text-2xl text-center capitalize border-b border-dashed">
          Your saved questions
        </p>
        <div className="flex flex-col w-full mt-6 mb-12 space-y-3 max-h-[80%] overflow-y-auto scroll-div">
          {!questions ||
            (questions.length === 0 && (
              <p className="text-center text-lg text-white">
                No questions here
              </p>
            ))}
          {questions &&
            questions.map((question: Question) => (
              <Question key={question.id} question={question} />
            ))}
        </div>
      </div>
    </PapersContainer>
  );
};

export default QuestionsScreen;
