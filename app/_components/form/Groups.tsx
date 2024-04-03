"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BiSolidCategoryAlt } from "react-icons/bi";

import Questions from "./Questions";
import { useHomeStore } from "@/app/_store/HomeStore";
const Groups = ({ pdfName }: { pdfName: string }) => {
  const currentQuestion: ExamQuestions | { error: string } | null =
    useHomeStore((state) => state.currentQuestion);

  return (
    <Accordion type="single" collapsible className="w-full">
      {!currentQuestion || "error" in currentQuestion ? (
        <div className="text-white text-center">
          <p>{currentQuestion?.error}</p>
        </div>
      ) : null}
      {currentQuestion != null &&
        !("error" in currentQuestion) &&
        Object.keys(currentQuestion).map((category, index) => {
          return (
            <AccordionItem
              value={category}
              id={category}
              className="box-shadow-group my-2"
            >
              <AccordionTrigger>
                <div className="flex items-center no-underline">
                  <BiSolidCategoryAlt size={22} className="mr-2" /> {category}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Questions
                  data={currentQuestion[category as keyof ExamQuestions]}
                  pdfName={pdfName}
                  category={category}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};

export default Groups;
