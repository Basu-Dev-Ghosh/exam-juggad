"use client";
import React, { useEffect } from "react";
import { RiRestartLine } from "react-icons/ri";
import { LiaSave } from "react-icons/lia";
import { useHomeStore } from "@/app/_store/HomeStore";
import { useToast } from "@/components/ui/use-toast";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
const Question = ({ question }: { question: Question }) => {
  const [
    updateAnswer,
    createNewSuggestion,
    suggestions,
    getSuggestions,
    saveQuestionToSuggestion,
  ] = useHomeStore((state) => [
    state.updateAnswer,
    state.createNewSuggestion,
    state.suggestions,
    state.getSuggestions,
    state.saveQuestionToSuggestion,
  ]);
  const questionType = (question as Question).options ? "MCQ" : "GroupB";
  const [newAnswer, setNewAnswer] = React.useState(question.answer || "");
  const [suggestionId, setSuggestionId] = React.useState<string | null>(null);
  const [answerLoading, setAnswerLoading] = React.useState(false);
  const [createNewSuggestionMode, setCreateNewSuggestionMode] =
    React.useState(false);
  const [newSuggestionName, setNewSuggestionName] = React.useState("");
  const { data: session } = useSession();
  const { toast } = useToast();
  const getAnswer = async () => {
    let question2 = question.question;
    if (questionType === "MCQ") {
      question2 =
        question2 +
        "\n Options are: " +
        (question as Question).options?.split("@").join(", ");
    }
    setAnswerLoading(true);

    const response = await fetch(
      `https://exam-juggad-server.onrender.com/ai-answer?question=${encodeURIComponent(
        question2
      )}&marks=${question.marks}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setNewAnswer(data.answer);
    setAnswerLoading(false);
  };

  useEffect(() => {
    getSuggestions(session?.user?.email);
  }, []);

  return (
    <div className="w-full relative max-w-5xl bg-[#2f579c75] rounded-b-lg border-t-8 border-[#A1FF14] px-4 py-5 flex flex-col justify-around shadow-md">
      <p className="text-md md:text-[1.3rem] font-bold font-sans text-white">
        {question.question}
      </p>
      {questionType === "MCQ" && (
        <div className="flex flex-wrap items-center justify-start md:justify-normal px-1 md:px-10 w-full md:space-x-4 mt-3 ">
          {(question as Question).options &&
            (question as Question).options?.split("@").map((option, index) => {
              return (
                <p
                  key={index}
                  className="flex justify-center items-center text-[.7rem] md:text-[.8rem] text-white mt-2 md:mt-0 mr-4 md:mr-0"
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
      <p className=" absolute top-2 md:top-6 right-8 text-white">
        {question.marks}
      </p>
      <div className="py-3 md:px-6">
        <p className="text-slate-200 text-[.75rem] md:text-[.85rem] mt-3 max-w-[99%] md:max-w-[90%]">
          {newAnswer}
        </p>
      </div>
      <div className="flex justify-between">
        <svg
          className="w-6 h-6"
          stroke="#fff"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="text-sm flex flex-wrap  gap-2">
          {/* <Sheet>
            <SheetTrigger asChild>
              <button className="button text-sm md:text-md">
                <span className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-black">
                  <FaPlus size={14} color="#fff" className="svgIcon" />
                </span>
                Add to Suggestions
              </button>
            </SheetTrigger>
            <SheetContent className="bg-[#1c1c1cdd] text-white ">
              <SheetHeader className="text-white">
                <SheetTitle className="text-white">Suggestions</SheetTitle>
                <SheetDescription>
                  You can add this to existing Suggestions or can create new
                  one.
                </SheetDescription>
              </SheetHeader>
              <div className="w-full mt-6 px-6 flex flex-col space-y-2 justify-center items-center">
                <Select onValueChange={(value) => setSuggestionId(value)}>
                  <SelectTrigger className="w-[100%] bg-black border-0 outline-none active:outline-none active:border-0">
                    <SelectValue placeholder="Select a Suggestion" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white">
                    <SelectGroup>
                      <SelectLabel>Suggestions</SelectLabel>
                      {suggestions?.map(
                        (suggestion: { id: string; name: string }) => (
                          <SelectItem value={suggestion.id.toString()}>
                            {suggestion.name}
                          </SelectItem>
                        )
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  className="w-[100%] bg-[#A1FF14] text-black hover:bg-[#9ed64a] active:scale-95 border-0 outline-none active:outline-none active:border-0"
                  type="submit"
                  onClick={() =>
                    setCreateNewSuggestionMode(!createNewSuggestionMode)
                  }
                >
                  <FaPlus className="mr-2" /> Create new
                </Button>
              </div>
              {createNewSuggestionMode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="grid gap-4 py-4 px-8"
                >
                  <div className="flex flex-col mt-4">
                    <Label htmlFor="name" className="text-left w-full mb-3">
                      Suggestion Name
                    </Label>
                    <Input
                      id="name"
                      className="col-span-4 text-black"
                      onChange={(e) => setNewSuggestionName(e.target.value)}
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
                        session?.user?.email
                      );
                      setCreateNewSuggestionMode(false);
                    }}
                    className="w-full bg-[#A1FF14] text-black hover:bg-[#9ed64a] active:scale-95"
                  >
                    Create
                  </Button>
                </motion.div>
              )}

              <SheetFooter className=" h-[46%] px-6 py-4 flex flex-col justify-end">
                <SheetClose asChild className="w-full">
                  <Button
                    onClick={() => {
                      if (!suggestionId) {
                        toast({
                          title: "Please select a suggestion",
                          description:
                            "Please select a suggestion to add this question",
                        });
                        return;
                      }
                      saveQuestionToSuggestion(question, suggestionId);
                      toast({
                        title: "Question added successfully",
                        description:
                          "Go to my suggestions to view the question",
                      });
                    }}
                    type="submit"
                    className="w-full mt-auto bg-[#A1FF14] text-black hover:bg-[#9ed64a] active:scale-95"
                  >
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet> */}

          <button
            onClick={() => {
              updateAnswer(question.id, newAnswer);
              toast({
                title: "Answer saved successfully",
                description: "If not show please refresh once",
              });
            }}
            className="group flex text-white items-center justify-center bg-black rounded-sm  transition-colors ease-in-out px-3"
          >
            <span className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-white mr-2 group-hover:animate-spin">
              <LiaSave size={12} color="#000" className="svgIcon" />
            </span>
            Save
          </button>
          <button
            onClick={getAnswer}
            disabled={answerLoading}
            className="flex items-center justify-center disabled:bg-gray-400 bg-slate-200 px-2 rounded-sm hover:bg-slate-300 transition-colors ease-in-out"
          >
            <RiRestartLine
              size={12}
              className={`mr-2 ${answerLoading && "animate-spin"}`}
            />{" "}
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
