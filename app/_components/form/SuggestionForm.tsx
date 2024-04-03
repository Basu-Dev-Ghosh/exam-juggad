"use client";

import React from "react";
import { motion } from "framer-motion";
import FormContainer from "./FormContainer";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useHomeStore } from "@/app/_store/HomeStore";
import { getQuestions, getSuggestions } from "@/app/actions";
import { CiSquarePlus } from "react-icons/ci";
import Groups from "./Groups";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const variants = {
  open: { scale: [0, 1], x: [400, 0] },
  closed: { scale: [1, 0], x: [0, 400] },
};
const SuggestionForm = () => {
  const [
    currentQuestion,
    changeCurrentQuestion,
    questionUploading,
    setQuestionUploading,
    saveCurrentQuestionToDB,
  ] = useHomeStore((state) => [
    state.currentQuestion,
    state.changeCurrentQuestion,
    state.questionUploading,
    state.setQuestionUploading,
    state.saveCurrentQuestionToDB,
  ]);
  const { data: session } = useSession();
  const [addingQuestion, setAddingQuestion] = React.useState(false);
  const [newSuggestionName, setNewSuggestionName] = React.useState("");
  const [suggestionDialog, setSuggestionDialog] = React.useState(false);
  const [createNewSuggestion, saveQuestionToSuggestion] = useHomeStore(
    (state) => [state.createNewSuggestion, state.saveQuestionToSuggestion]
  );
  const { toast } = useToast();
  return (
    <FormContainer>
      <div>
        <p className="text-white text-2xl text-center capitalize mt-3">
          Add your previous years question papers here and get AI generated
          suggestions
        </p>
        <form className="mt-3 w-full h-[130px] border border-dashed flex flex-col justify-center items-center">
          <p className="text-white my-3">
            Select multiple pdf files or Drag here
          </p>
          <label htmlFor="uploadpdf">
            <div
              className={
                "btn hover:bg-[#f9fafb] active:bg-[#f9fafb] cursor-pointer text-center w-[220px] px-1 py-2 text-black bg-white rounded-md shadow"
              }
            >
              <p>Select PDF files</p>
            </div>
          </label>
          <input
            multiple
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

                const questions: ExamQuestions | { error: string } =
                  await getSuggestions(e.target.files);

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
                Plaese wait AI is Scanning your question papers
                <br />
              </p>
            </div>
          ) : (
            <div className="w-full">
              {currentQuestion && (
                <div className="flex w-full justify-between items-center">
                  <p className="text-white text-lg border-b border-dashed">
                    AI generated Suggestion
                  </p>
                  <Dialog open={suggestionDialog}>
                    <DialogTrigger asChild>
                      <button className="btn w-auto transition-all duration-200 ease-in-out hover:bg-[#0a0a0a] active:bg-[#0a0a0a]  bg-black px-6 py-0 text-white rounded-sm flex justify-center items-center">
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
                            <p>Save suggestion</p>
                          </div>
                        ) : null}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-black">
                      <DialogHeader className="text-white">
                        <DialogTitle>Create a new Suggestion</DialogTitle>
                      </DialogHeader>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid gap-4 py-4 px-8 text-white"
                      >
                        <div className="flex flex-col mt-4">
                          <Label
                            htmlFor="name"
                            className="text-left w-full mb-3 text-white"
                          >
                            Suggestion Name
                          </Label>
                          <Input
                            id="name"
                            className="col-span-4 text-black"
                            onChange={(e) =>
                              setNewSuggestionName(e.target.value)
                            }
                          />
                        </div>
                        <Button
                          onClick={() => {
                            if (!newSuggestionName) {
                              toast({
                                title: "Please enter a suggestion name",
                                description:
                                  "Please enter a suggestion name to create new suggestion",
                              });
                              return;
                            }
                            createNewSuggestion(
                              newSuggestionName,
                              session?.user?.email,
                              currentQuestion as ExamQuestions
                            );
                            toast({
                              title: "Suggestion Created",
                              description: "Suggestion created successfully",
                            });
                            setSuggestionDialog(false);
                          }}
                          className="w-full bg-[#A1FF14] text-black hover:bg-[#9ed64a] active:scale-95"
                        >
                          Create and Save
                        </Button>
                      </motion.div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}

              <Groups pdfName={"AI generated Suggestion"} />
            </div>
          )}
        </div>
      </div>
    </FormContainer>
  );
};

export default SuggestionForm;
