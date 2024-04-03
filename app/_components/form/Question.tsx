"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React from "react";
import { PiQuestionFill } from "react-icons/pi";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useHomeStore } from "@/app/_store/HomeStore";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { AiFillThunderbolt } from "react-icons/ai";

const Question = ({
  category,
  data,
  pdfName,
}: {
  category: string;
  data: MCQQuestion | GroupBQuestion;
  pdfName: string;
}) => {
  const questionType = (data as MCQQuestion).options ? "MCQ" : "GroupB";
  const [answerLoading, setAnswerLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState<string | null>(null);
  const saveQuestionToDB = useHomeStore((state) => state.saveQuestionToDB);
  const { data: session } = useSession();
  const { toast } = useToast();

  const getAnswer = async (
    question: string,
    marks: number,
    options?: string[]
  ) => {
    if (questionType === "MCQ") {
      question = question + "\n Options are: " + options?.join(", ");
    }
    setAnswerLoading(true);
    setAnswer(null);
    const response = await fetch(
      `https://exam-juggad-server.onrender.com/ai-answer?question=${encodeURIComponent(
        question
      )}&marks=${marks}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setAnswer(data.answer);
    setAnswerLoading(false);
  };
  return (
    <AccordionItem
      value={data.question ? data.question.toString() : ""}
      className="relative box-shadow-question"
    >
      <AccordionTrigger className="max-w-4xl flex flex-col">
        <div className=" flex items-center justify-between w-full">
          <div className=" flex items-start w-full md:w-[90%]">
            <div className="w-[10px] md:w-[40px] h-[10px] md:h-[40px]">
              <AiFillThunderbolt size={20} color="#fff" className="mr-4 mt-2" />
            </div>
            <p className="text-sm md:text-lg text-left ml-6">
              {" "}
              {data?.question}
            </p>
          </div>
          <div className="absolute top-2 right-2 w-[20px] h-[20px] text-sm rounded-full flex justify-center items-center bg-black text-white">
            <p>{data.marks}</p>
          </div>
        </div>
        {questionType === "MCQ" && (
          <div className="flex flex-wrap items-center md:px-10 w-full  mt-3">
            {(data as MCQQuestion).options &&
              (data as MCQQuestion).options.map((option, index) => {
                return (
                  <p
                    key={index}
                    className="flex justify-center mt-2 items-center text-[.72em] px-2 md:px-3 md:text-[.8rem] text-white mr-4 md:mr-0"
                  >
                    <span className="w-[18px] h-[18px]  md:w-[21px] md:h-[21px] mr-2 flex justify-center items-center rounded-full bg-black text-xs md:text-sm text-white">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </p>
                );
              })}
          </div>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <button
          className="btn mx-auto  w-auto transition-all duration-200 ease-in-out hover:bg-[#0a0a0a] active:bg-[#0a0a0a] md:mx-10 bg-black px-6 py-2 text-white rounded-sm flex justify-center items-center"
          onClick={() => {
            getAnswer(data.question, data.marks, (data as MCQQuestion).options);
          }}
        >
          {answerLoading && (
            <div className="loader">
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
              <div className="circle" />
            </div>
          )}
          {!answerLoading ? (answer ? "Regenerate" : "Get Answer") : null}
        </button>
        {answer && (
          <div className="w-full max-w-4xl md:px-10">
            <TextGenerateEffect words={answer} />
            {answer && (
              <button
                onClick={() => {
                  let dt = {
                    user_email: session?.user?.email,
                    question: data.question,
                    answer: answer,
                    marks: data.marks,
                    paper_name: pdfName,
                    type: category,
                    options: (data as MCQQuestion)?.options
                      ? (data as MCQQuestion).options.join("@")
                      : null,
                  };
                  saveQuestionToDB(dt);
                  toast({
                    title: "Question saved successfully",
                    description: "Go to my saved questions to see the question",
                  });
                }}
                className="min-w-full md:min-w-[160px] btn bg-green-700 mt-2 text-white rounded-none"
              >
                Save
              </button>
            )}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Question;
