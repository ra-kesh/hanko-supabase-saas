"use client";

import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";
import { LogoutBtn } from "./LogoutButton";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;

export default function HankoProfile() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <>
      <hanko-profile />
      <LogoutBtn />
    </>
  );
}
