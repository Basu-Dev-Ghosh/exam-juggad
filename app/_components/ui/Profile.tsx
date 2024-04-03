"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Search from "./Search";
const Profile = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center mt-2 md:mt-0">
      <Search />
      <Image
        src={session?.user?.image || "/user.png"}
        alt="User image"
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
  );
};

export default Profile;
