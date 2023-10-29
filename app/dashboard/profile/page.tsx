"use client";

import dynamic from "next/dynamic";
import React from "react";
import { DashBaordHeader } from "../components/DashBoardHeader";
import UserNameForm from "./components/UserNameForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button/Button.component";
import { Icons } from "@/components/Icons.component";

const HankoProfile = dynamic(() => import("@/components/hanko/HankoProfile"), {
  ssr: false,
});

const Profile = () => {
  return (
    <div className="grid items-start gap-8">
      <DashBaordHeader
        heading="Profile"
        text="Manage your profile and authentication settings"
      >
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
          <Icons.back size={"1rem"} /> &nbsp; Dashboard
        </Link>
      </DashBaordHeader>
      <div className="grid items-start sm:grid-cols-2 gap-10">
        <UserNameForm />
        <HankoProfile />
      </div>
    </div>
  );
};

export default Profile;
