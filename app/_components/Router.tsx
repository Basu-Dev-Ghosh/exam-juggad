"use client";
import React from "react";
import { useHomeStore } from "../_store/HomeStore";
import DashboardHeader from "./dashboard/DashboardHeader";
import DashboardContent from "./dashboard/DashboardContent";
import Form from "./form/Form";
import Papers from "./papers/Papers";
import FullPaper from "./papers/FullPaper";
import QuestionsScreen from "./questions/QuestionsScreen";
import SuggestionForm from "./form/SuggestionForm";
import Suggestions from "./papers/Suggestions";

const Router = () => {
  const screen = useHomeStore((state) => state.screen);
  return (
    <div className="w-full h-full mx-1 md:mx-6 md:my-8">
      <DashboardHeader />
      {screen === "home" && <Form />}
      {screen === "scan" && <Form />}
      {screen === "papers" && <Papers />}
      {screen === "paper" && <FullPaper />}
      {screen === "questions" && <QuestionsScreen />}
      {screen === "suggestion" && <SuggestionForm />}
      {screen === "suggestions" && <Suggestions />}
    </div>
  );
};

export default Router;
