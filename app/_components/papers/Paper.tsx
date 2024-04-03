"use client";

import { useHomeStore } from "@/app/_store/HomeStore";
import React from "react";
import { MdOutlineDocumentScanner } from "react-icons/md";
const Paper = ({ paper }: { paper: Paper }) => {
  const [changeScreen, changeCurrentQuestion, setCurrentQuestionPaperName] =
    useHomeStore((state) => [
      state.changeScreen,
      state.changeCurrentQuestion,
      state.setCurrentQuestionPaperName,
    ]);
  function getPaperDescription() {
    let data = JSON.parse(paper.data);

    let counts: { [key: string]: number } = {};

    Object.keys(data).forEach((category) => {
      counts[category] = data[category].length;
    });

    let description = Object.entries(counts)
      .map(([category, count]) => `${category}:${count}`)
      .join(" ");

    return description;
  }

  function getTimeDifference(timestamp: string) {
    const currentDate = new Date();
    const givenDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);

    if (secondsDifference < 60) {
      return `${secondsDifference} second${
        secondsDifference !== 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference < 3600) {
      const minutesDifference = Math.floor(secondsDifference / 60);
      return `${minutesDifference} minute${
        minutesDifference !== 1 ? "s" : ""
      } ago`;
    } else if (secondsDifference < 86400) {
      const hoursDifference = Math.floor(secondsDifference / 3600);
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    } else {
      // If time difference is greater than 24 hours, return the date
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return givenDate.toLocaleDateString("en-US", options);
    }
  }
  return (
    <div
      className="card"
      onClick={() => {
        let data = JSON.parse(paper.data);
        setCurrentQuestionPaperName(paper.paper_name);
        changeCurrentQuestion(data);
        changeScreen("paper");
      }}
    >
      <div className="img">
        <MdOutlineDocumentScanner size={24} color="#000" />
      </div>
      <div className="textBox">
        <div className="textContent">
          <p className="h1">{paper.paper_name}</p>
          <span className="span">{getTimeDifference(paper.created_at)}</span>
        </div>
        <p className="p">{getPaperDescription()}</p>
        <div />
      </div>
    </div>
  );
};

export default Paper;
