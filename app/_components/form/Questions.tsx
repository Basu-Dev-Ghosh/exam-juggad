"use client";
import React from "react";
import { PiQuestionFill } from "react-icons/pi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Question from "./Question";
const Questions = ({
  data,
  pdfName,
  category,
}: {
  data?: QuestionData;
  pdfName: string;
  category: string;
}) => {
  return (
    <Accordion type="single" collapsible className="w-full px-4 ">
      {data?.map((question, index) => {
        return (
          <Question
            category={category}
            key={index}
            data={question}
            pdfName={pdfName}
          />
        );
      })}
    </Accordion>
  );
};

export default Questions;
