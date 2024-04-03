import React from "react";
import { Comfortaa } from "next/font/google";
const comfortaa = Comfortaa({ subsets: ["latin"] });
const Logo = () => {
  return (
    <div className="border-b  p-0 h-10 border-dashed text-center w-full mb-2 md:text-left md:w-auto md:mb-0">
      <p
        className={`text-md text-white md:text-xl font-semibold ${comfortaa.className}`}
      >
        Exam
        <span> Juggad</span> <span className="text-xs">by basu</span>
      </p>
    </div>
  );
};

export default Logo;
