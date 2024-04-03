"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
const Search = () => {
  return (
    <div className="flex items-center flex-row max-w-[16em] w-auto h-auto bg-[#FCFCFC] rounded-[0.8em] overflow-hidden mr-8">
      <CiSearch size={26} className="mx-2" color="#999" />
      <input
        className="bg-transparent text-black outline-none w-full border-0 py-[0.5em] pr-[1.5em] pl-0 text-[1em] placeholder-[#c1c6cf]"
        id="inputBox"
        type="text"
        placeholder="Search For Papers"
      />
    </div>
  );
};

export default Search;
