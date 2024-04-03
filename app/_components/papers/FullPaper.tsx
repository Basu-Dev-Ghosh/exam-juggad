"use client";

import React from "react";
import { motion } from "framer-motion";
import { useHomeStore } from "@/app/_store/HomeStore";
import { CiSquarePlus } from "react-icons/ci";
import Groups from "../form/Groups";
import FormContainer from "../form/FormContainer";
const variants = {
  open: { scale: [0, 1], x: [400, 0] },
  closed: { scale: [1, 0], x: [0, 400] },
};
const FullPaper = () => {
  const [
    currentQuestion,
    changeCurrentQuestion,
    questionUploading,
    currentQuestionPaperName,
    changeScreen,
    setCurrentQuestionPaperName,
  ] = useHomeStore((state) => [
    state.currentQuestion,
    state.changeCurrentQuestion,
    state.questionUploading,
    state.currentQuestionPaperName,
    state.changeScreen,
    state.setCurrentQuestionPaperName,
  ]);

  return (
    <FormContainer>
      <div className="w-full text-white md:h-[80%] h-[100dvh] overflow-y-auto scroll-div md:mt-4 md:py-3">
        {questionUploading ? (
          <div className=" w-full m h-full flex flex-col justify-center items-center">
            <motion.div
              animate={questionUploading ? "open" : "closed"}
              variants={variants}
              className="spinner"
            >
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </motion.div>
            <p className="mt-12 text-lg text-center">
              Plaese wait AI is Scanning your
              <br /> {currentQuestionPaperName}...
            </p>
          </div>
        ) : (
          <div className="w-full">
            {currentQuestion && (
              <div className="flex w-full mb-4 justify-between items-center ">
                <p className="text-white text-md md:text-lg border-b border-dashed">
                  {currentQuestionPaperName}
                </p>
              </div>
            )}

            <Groups pdfName={currentQuestionPaperName} />
          </div>
        )}
      </div>
    </FormContainer>
  );
};

export default FullPaper;
