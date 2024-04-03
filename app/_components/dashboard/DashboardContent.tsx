import React from "react";
import DashboardBar from "./DashboardBar";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { RiExchangeFill, RiExchangeLine } from "react-icons/ri";
import {
  FaArrowCircleRight,
  FaBookmark,
  FaRegArrowAltCircleRight,
  FaRegBookmark,
} from "react-icons/fa";

const DashboardContent = () => {
  return (
    <div className="grid md:grid-rows-2 gap-8 px-12 md:py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#6d5fb4] rounded-2xl h-60 md:col-span-2 px-4 md:px-8 shadow">
          <div className=" absolute pt-4 md:pt-10 pb-2 px-0 md:px-2 text-center border-b border-dashed">
            <p className="text-white text-base md:text-2xl ">Overview</p>
          </div>
          <div className="px-0 py-4 md:p-0 w-full h-full">
            <DashboardBar />
          </div>
        </div>
        <div className="group relative bg-[#F4739C] h-60 rounded-2xl shadow px-8 flex justify-center items-center cursor-pointer hover:scale-95 active:scale-90 transition duration-200 ease-in-out">
          <AiOutlinePlusCircle
            size={50}
            color="#fff"
            className="absolute bottom-6 right-4 group-hover:hidden"
          />
          <AiFillPlusCircle
            size={50}
            color="#fff"
            className="absolute bottom-6 right-4 hidden group-hover:block"
          />
          <div className="absolute top-9 left-6 pb-2 px-2 text-center border-b border-dashed">
            <p className="text-white text-base md:text-2xl ">Prepared</p>
          </div>
          <p className="text-4xl md:text-6xl text-white">08/10</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="group bg-white h-44  rounded-2xl shadow px-6 relative cursor-pointer hover:scale-95 transition duration-200 ease-in-out active:scale-90">
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-[#6d5fb4] rounded-2xl absolute -top-4 right-8 flex justify-center items-center">
            <RiExchangeLine
              size={30}
              color="#fff"
              className="group-hover:hidden"
            />
            <RiExchangeFill
              size={30}
              color="#fff"
              className="hidden group-hover:block"
            />
          </div>
          <div className=" absolute pt-10 pb-2 px-2 text-center border-b border-dashed">
            <p className="text-black text-2xl ">Selected Paper</p>
          </div>
          <p className="absolute bottom-12 left-8">
            Artificial Intelligence.pdf
          </p>
        </div>
        <div className="group bg-white h-44  rounded-2xl shadow px-6 relative cursor-pointer hover:scale-95 transition duration-200 ease-in-out active:scale-90">
          <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] bg-[#6d5fb4] rounded-2xl absolute -top-4 right-8 flex justify-center items-center">
            <FaRegBookmark
              size={20}
              color="#fff"
              className="group-hover:hidden"
            />
            <FaBookmark
              size={20}
              color="#fff"
              className="hidden group-hover:block"
            />
          </div>
          <div className=" absolute pt-10 pb-2 px-2 text-center border-b border-dashed">
            <p className="text-black text-2xl ">Saved Questions</p>
          </div>
          <p className="absolute bottom-12 left-8">
            What is the company .......
          </p>
        </div>
        <div className="group flex justify-center items-center bg-white h-44  rounded-2xl shadow px-6 relative cursor-pointer hover:scale-95 transition duration-200 ease-in-out active:scale-90">
          <p className="text-4xl text-green-500">Start</p>
          <FaRegArrowAltCircleRight
            size={40}
            color="green"
            className="group-hover:hidden ml-6"
          />
          <FaArrowCircleRight
            size={40}
            color="green"
            className="hidden group-hover:block ml-6"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
