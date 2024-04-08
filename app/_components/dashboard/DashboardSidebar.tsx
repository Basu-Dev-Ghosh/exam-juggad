"use client";
import React from "react";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { IoDocumentText, IoDocumentTextOutline } from "react-icons/io5";
import { MdDocumentScanner, MdOutlineDocumentScanner } from "react-icons/md";
import { BsQuestionCircle, BsQuestionCircleFill } from "react-icons/bs";
import { GiBulb } from "react-icons/gi";
import { TbRobot } from "react-icons/tb";
import { LuWallpaper } from "react-icons/lu";
import { useHomeStore } from "@/app/_store/HomeStore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DashboardSidebar = () => {
  const [screen, changeScreen, changeBackground] = useHomeStore((state) => [
    state.screen,
    state.changeScreen,
    state.changeBackground,
  ]);
  let bgImages = Array.from({ length: 18 }, (_, i) => `/bg/bg${i + 1}.jpg`);
  return (
    <div className="h-auto bg-[#6d5fb4] w-[60px] mr-6 my-4 rounded-3xl pt-6 hidden md:flex flex-col items-center">
      <Drawer>
        <DrawerTrigger>
          {" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group border-b border-slate-400 flex justify-center  mt-6 h-[50px]  w-[40px] transition-all duration-200 ease-in-out cursor-pointer">
                  <LuWallpaper
                    size={26}
                    color="#fff"
                    className="group-hover:scale-95 "
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change background</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DrawerTrigger>
        <DrawerContent className="h-[50vh] drawer-content">
          <DrawerHeader>
            <DrawerTitle className="text-white">
              Select your background
            </DrawerTitle>
          </DrawerHeader>
          <div className="w-full flex justify-center">
            <Carousel className="w-full max-w-[91%]">
              <CarouselContent className="-ml-1">
                {bgImages.map((src, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-1 md:basis-1/3 lg:basis-1/4"
                    >
                      <div
                        onClick={() => {
                          changeBackground(src);
                        }}
                        className="group w-[300px] h-[220px] object-cover shadow hover:scale-95 active:scale-90 cursor-pointer transition-all duration-200 ease-in-out"
                      >
                        <DrawerClose className="w-full h-full object-cover overflow-hidden">
                          <img
                            src={src}
                            alt="bg"
                            className="rounded-md w-full h-full object-cover  transition-all duration-200 ease-in-out"
                          />
                        </DrawerClose>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="bg-red-300" />
              <CarouselNext />
            </Carousel>
          </div>
        </DrawerContent>
      </Drawer>

      {/* <div
        onClick={() => changeScreen("home")}
        className={`group flex justify-center items-center mt-6 h-[40px] ${
          screen === "home" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
        } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
      >
        <AiOutlineHome
          size={24}
          color="#fff"
          className={` ${screen === "home" ? "hidden" : "group-hover:hidden"}`}
        />
        <AiFillHome
          size={24}
          color="#fff"
          className={` group-hover:block ${
            screen === "home" ? "block" : "hidden"
          }`}
        />
      </div> */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => changeScreen("scan")}
              className={`group flex justify-center items-center mt-6 h-[40px] ${
                screen === "scan" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
              } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <MdOutlineDocumentScanner
                size={24}
                color="#fff"
                className={` ${
                  screen === "scan" ? "hidden" : "group-hover:hidden"
                }`}
              />
              <MdDocumentScanner
                size={24}
                color="#fff"
                className={` group-hover:block ${
                  screen === "scan" ? "block" : "hidden"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get AI Answers</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => changeScreen("suggestion")}
              className={`group flex justify-center items-center mt-6 h-[40px] ${
                screen === "suggestion" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
              } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <TbRobot
                size={24}
                color="#fff"
                className={` ${
                  screen === "suggestion" ? "hidden" : "group-hover:hidden"
                }`}
              />
              <TbRobot
                size={24}
                color="#fff"
                className={` group-hover:block ${
                  screen === "suggestion" ? "block" : "hidden"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get AI Suggestion</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => changeScreen("papers")}
              className={`group flex justify-center items-center mt-6 h-[40px] ${
                screen === "scan" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
              } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <IoDocumentTextOutline
                size={24}
                color="#fff"
                className={` ${
                  screen === "papers" ? "hidden" : "group-hover:hidden"
                }`}
              />
              <IoDocumentText
                size={24}
                color="#fff"
                className={` group-hover:block ${
                  screen === "papers" ? "block" : "hidden"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>My Saved Papers</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => changeScreen("questions")}
              className={`group flex justify-center items-center mt-6 h-[40px] ${
                screen === "questions" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
              } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <BsQuestionCircle
                size={24}
                color="#fff"
                className={` ${
                  screen === "questions" ? "hidden" : "group-hover:hidden"
                }`}
              />
              <BsQuestionCircleFill
                size={24}
                color="#fff"
                className={` group-hover:block ${
                  screen === "questions" ? "block" : "hidden"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>My Saved Questions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => changeScreen("suggestions")}
              className={`group flex justify-center items-center mt-6 h-[40px] ${
                screen === "suggestions" ? "bg-[#5A5381]" : "hover:bg-[#5A5381]"
              } w-[40px] rounded-xl transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <GiBulb
                size={24}
                color="#fff"
                className={` ${
                  screen === "suggestions" ? "hidden" : "group-hover:hidden"
                }`}
              />
              <GiBulb
                size={24}
                color="#fff"
                className={` group-hover:block ${
                  screen === "suggestions" ? "block" : "hidden"
                }`}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>My Saved Suggestions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DashboardSidebar;
