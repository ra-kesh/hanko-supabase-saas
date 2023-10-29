import Link from "next/link";
import React from "react";
import { Icons } from "../Icons.component";
import { siteConfig } from "@/config/site";

const MainNav = () => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={"/"} className="items-center space-x-2 flex">
        <Icons.logo className="font-bold inline-block" />
        <span>{siteConfig.name}</span>
      </Link>
    </div>
  );
};

export default MainNav;
