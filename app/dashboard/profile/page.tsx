"use client";

import dynamic from "next/dynamic";
import React from "react";
import { DashBaordHeader } from "../components/DashBoardHeader";
import UserNameForm from "./components/UserNameForm";

const HankoProfile = dynamic(() => import("@/components/HankoProfile"), {
  ssr: false,
});

const Profile = () => {
  return (
    <div className="grid items-start gap-8">
      <DashBaordHeader
        heading="Profile"
        text="Manage your profile and authentication settings"
      ></DashBaordHeader>
      <div className="grid items-start sm:grid-cols-2 gap-10">
        <UserNameForm />
        <HankoProfile />
      </div>
    </div>
  );
};

export default Profile;
