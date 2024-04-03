"use client";

import React from "react";
import { motion } from "framer-motion";
import FormContainer from "./FormContainer";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useHomeStore } from "@/app/_store/HomeStore";
import { getQuestions } from "@/app/actions";
import { CiSquarePlus } from "react-icons/ci";
import Groups from "./Groups";
const variants = {
  open: { scale: [0, 1], x: [400, 0] },
  closed: { scale: [1, 0], x: [0, 400] },
};
const Form = () => {
  const [
    currentQuestion,
    changeCurrentQuestion,
    questionUploading,
    setQuestionUploading,
    saveCurrentQuestionToDB,
    currentQuestionPaperName,
    setCurrentQuestionPaperName,
  ] = useHomeStore((state) => [
    state.currentQuestion,
    state.changeCurrentQuestion,
    state.questionUploading,
    state.setQuestionUploading,
    state.saveCurrentQuestionToDB,
    state.currentQuestionPaperName,
    state.setCurrentQuestionPaperName,
  ]);
  const { data: session } = useSession();
  const [pdfName, setPdfName] = React.useState("");
  const [addingQuestion, setAddingQuestion] = React.useState(false);
  const { toast } = useToast();
  return (
    <FormContainer>
      <div>
        <p className="text-white text-2xl text-center capitalize mt-3">
          Add your question paper here and get all extracted questions and their
          answers
        </p>
        <form className="mt-3 w-full h-[130px] border border-dashed flex flex-col justify-center items-center">
          <p className="text-white my-3">Select a pdf file or Drag here</p>
          <label htmlFor="uploadpdf">
            <div
              className={
                "btn hover:bg-[#f9fafb] active:bg-[#f9fafb] cursor-pointer text-center w-[220px] px-1 py-2 text-black bg-white rounded-md shadow"
              }
            >
              <p>Select a PDF file</p>
            </div>
          </label>
          <input
            disabled={questionUploading}
            type="file"
            id="uploadpdf"
            accept="application/pdf"
            className="hidden"
            onChange={async (e) => {
              console.log("Files", e.target.files);
              setQuestionUploading(true);
              if (e.target.files && e.target.files.length > 0) {
                console.log("Files", e.target.files);
                setPdfName(e.target.files[0].name);
                const questions: ExamQuestions | { error: string } =
                  await getQuestions(e.target.files);
                setCurrentQuestionPaperName(e.target.files[0].name);
                console.log("Questions", questions);
                changeCurrentQuestion(questions);
                setQuestionUploading(false);
              }
            }}
          />
        </form>
        <div className="w-full text-white h-[270px] overflow-y-auto scroll-div mt-4 py-3">
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
                <br /> {pdfName}...
              </p>
            </div>
          ) : (
            <div className="w-full">
              {currentQuestion && (
                <div className="flex w-full justify-between items-center">
                  <p className="text-white text-lg border-b border-dashed">
                    {pdfName}
                  </p>
                  <button
                    className="btn w-auto transition-all duration-200 ease-in-out hover:bg-[#0a0a0a] active:bg-[#0a0a0a]  bg-black px-6 py-0 text-white rounded-sm flex justify-center items-center"
                    onClick={() => {
                      let data: any = {
                        user_email: session?.user?.email,
                        data: JSON.stringify(currentQuestion),
                        paper_name: pdfName,
                      };
                      setAddingQuestion(true);
                      saveCurrentQuestionToDB(data);
                      setAddingQuestion(false);
                      toast({
                        title: "Paper added successfully",
                        description: "Go to my papers to see the paper",
                      });
                    }}
                  >
                    {addingQuestion && (
                      <div className="loader">
                        <div className="circle" />
                        <div className="circle" />
                        <div className="circle" />
                        <div className="circle" />
                      </div>
                    )}
                    {!addingQuestion ? (
                      <div className="flex items-center justify-center">
                        {" "}
                        <CiSquarePlus size={26} className="mr-2" />
                        <p>Add to Papers</p>
                      </div>
                    ) : null}
                  </button>
                </div>
              )}

              <Groups pdfName={currentQuestionPaperName} />
            </div>
          )}
        </div>
      </div>
    </FormContainer>
  );
};

export default Form;
