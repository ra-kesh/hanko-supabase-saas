"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";
import { toast } from "sonner";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

export function LogoutBtn() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const onLogout = () => {
    async function logOut() {
      await hanko?.user.logout();
      router.push("/login");
      router.refresh();
    }

    toast.promise(logOut(), {
      loading: "we are logging you out",
      success: "you have logged out successfully",
      error: "error during logout",
    });
  };

  return <button onClick={onLogout}>Sign out</button>;
}
